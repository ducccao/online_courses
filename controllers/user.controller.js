const userModal = require("./../models/user.model");
const bcryptjs = require("bcryptjs");
const config = require("./../config/default.json");
const courseModel = require("./../models/course.model");
const catModel = require("./../models/category.model");
const adminModel = require("./../models/admin.model");
const { generateOneTimePasswordURL } = require("./../utils/utilsFunction");
const { sendOTP } = require("./../utils/mail");
const moment = require("moment");
const multer = require("multer");
const userModel = require("./../models/user.model");
const fs = require("fs");
const chapterModel = require("../models/chapter.model");
const categoryModel = require("./../models/category.model");
const unitModel = require("./../models/unit.model");

const userController = {
    // get all user
    getAllUsers: async(req, res) => {
        try {
            const users = userModal.getAllUser();
            if (users) {
                return res.status(200).json({
                    users: users,
                });
            } else {
                return res.json({
                    message: "Cannot find any user!",
                });
            }
        } catch (er) {
            return res.status(500).json({ message: "Internal Server Error!" });
        }
    },

    // login
    getLogin: async(req, res) => {
        const ref = req.headers.referer;
        req.session.retUrl = ref;

        //console.log(ref);

        res.render("vwUser/Login", {
            layout: "loginout",
        });
    },
    // post login
    postLogin: async(req, res) => {
        const { email, password } = req.body;
        //  console.log(req.body);
        const infor = {
            email: email,
            password: password,
        };
        const isUserExists = await userModal.findUserByEmail(email);

        if (isUserExists.length === 0) {
            return res.status(404).json({ message: "Invalid email or password!" });
        }

        // console.log(isUserExists);
        // neu la admin thi render page admin luon

        if (isUserExists[0].decentralization === 2 && password === "admin123") {
            req.session.isAuth = true;
            req.session.authUser = isUserExists[0];
            req.session.cart = [];

            return res.json({ redirect: "/admin/dashboard" });
        }

        if (isUserExists[0].decentralization === 1 && password === "123123") {
            req.session.isAuth = true;
            req.session.authUser = isUserExists[0];
            req.session.cart = [];

            if (req.session.retUrl === "http://localhost:3000/user/register") {
                return res.json({ redirect: "/" });
            }

            return res.json({ redirect: req.session.retUrl || "/" });
        }

        const comparePassword = bcryptjs.compareSync(
            password,
            isUserExists[0].password
        );

        if (comparePassword === false) {
            return res.status(404).json({ message: "Invalid email or password!" });
        }

        req.session.isAuth = true;
        req.session.authUser = isUserExists[0];

        req.session.cart = [];

        let url = req.session.retUrl || "/";
        if (req.session.retUrl === `${config.devURL.URL}/user/register`) {
            return res.status(200).json({ redirect: "/" });
        }
        return res.status(200).json({ redirect: url });
    },

    // post logout
    postLogout: async(req, res) => {
        console.log("Logout route!!");

        req.session.isAuth = false;
        req.session.authUser = null;
        //   req.session.cart = [];

        let url = req.headers.referer;
        res.redirect(url);
    },
    // register
    getRegister: (req, res) => {
        res.render("vwUser/Register", {
            layout: "loginout",
        });
    },

    // post register
    postRegister: async(req, res) => {
        try {
            console.log("Registering!");
            const { username, email, password, dob } = req.body;
            //  console.log(req.body);

            // check email is available
            const checkEmail = await userModal.isAvailable(email);
            // console.log(checkEmail);

            if (checkEmail.length !== 0) {
                return res.status(404).json({ message: "Email have been used!" });
            }

            // hash password
            const hash = bcryptjs.hashSync(password, 10);
            //  console.log(hash);

            // format date - yyyy-mth-day
            const dobFormated = moment(dob, "DD/MM/YYYY").format("YYYY-MM-DD");

            // generate otp url
            const OTP = generateOneTimePasswordURL();

            const user = {
                userName: username,
                email,
                password: hash,
                DOB: dobFormated,
                decentralization: 0,
                verify: 0,
                OTP_URL: OTP,
            };

            const result = await userModal.addUser(user);

            // send email otp link
            // cannot send email by nodemailer

            sendOTP(email, OTP);

            // console.log(result);

            //console.log(dobFormated);

            res.render("vwUser/Register", {
                layout: "loginout",
            });
        } catch (er) {
            console.log(er);

            return res.status(404).json({ message: er.sqlMessage });
        }
    },

    // get veirify
    getVerify: async(req, res) => {
        const id = req.params.id;
        const OTP_URL = config.devURL + `/user/verify/${id}`;
        //console.log(id);
        console.log(OTP_URL);

        const userByOTP = await userModel.getUserByOTP(OTP_URL);
        //console.log(userByOTP);
        if (userByOTP.length !== 0) {
            const entity = {
                verify: 1,
            };
            const condition = {
                OTP_URL: OTP_URL,
            };
            const update = await userModel.updateVerifyUser(entity, condition);
            console.log(update);
        }

        res.render("vwUser/Verify", {
            layout: false,
        });
    },

    preventUserAccess: (req, res) => {
        res.render("vwUser/PreventAccess", {
            layout: false,
        });
    },

    // forgot password
    getForgotPassword: (req, res) => {
        res.render("vwUser/ForgotPassword", {
            layout: "loginout",
        });
    },

    // get profile
    getProfile: (req, res) => {
        res.render("vwUser/Profile", {
            layout: "main",
        });
    },

    // get upload course page
    getUploadCoursePage: (req, res) => {
        res.render("vwUser/UploadCourse", {
            layout: "main",
        });
    },
    // post upload course

    postUploadCourse: async(req, res) => {
        try {
            // avatar
            console.log("Uploading Course !!");
            // console.log("alo alo " + req.body);
            let avaName = "";
            let thumbnailName = "";
            const allCourse = await courseModel.all();
            const savePath = `./public/courses/course-${allCourse.length + 1}`;
            const storage = multer.diskStorage({
                destination: function(req, file, cb) {
                    fs.mkdirSync(savePath, { recursive: true });
                    cb(null, savePath);
                },
                filename: function(req, file, cb) {
                    if (file.originalname.includes("thumbnail")) {
                        thumbnailName = file.originalname;
                    } else {
                        avaName = file.originalname;
                    }
                    //  console.log(file);
                    cb(null, file.originalname);
                },
            });

            const upload = multer({ storage });

            upload.array("ulAva", 2)(req, res, async function(er) {
                if (er) {
                    console.log(er);
                } else {
                    const allCourse = await courseModel.all();
                    const isCatExists = await adminModel.getCatByCatName(
                        req.body.catName
                    );

                    const isCourseNameExists = await courseModel.getCourseByCourseName(
                        req.body.courseName
                    );

                    // console.log("Is cousrse exists", isCourseNameExists);
                    console.log(avaName + " and " + thumbnailName);
                    const avataURL = "../." + savePath + "/" + avaName;
                    const thumbnailURL = "../." + savePath + "/" + thumbnailName;
                    //console.log(avataURL);
                    console.log(isCatExists);
                    if (isCatExists.length === 0) {
                        console.log(
                            "I dont understand why are you always jump into here !"
                        );
                        return res
                            .status(400)
                            .json({ message: "Category Does Not Exists!" });
                    }

                    if (isCourseNameExists.length !== 0) {
                        console.log("Course is exists erorr!");
                        return res
                            .status(400)
                            .json({ message: "CourseName Is Already Existed!" });
                    }
                    //  console.log("Cat ID: ", isCatExists[0].catID);
                    const courseIdToAddChapter = allCourse.length + 1;
                    // const fulDesText = req.body.txtFullDes,
                    const entity = {
                        courseID: allCourse.length + 1,
                        courseName: req.body.courseName,
                        title: "",
                        catID: isCatExists[0].catID,
                        userID: req.session.authUser.userID,
                        thumbnail: thumbnailURL,
                        avatar: avataURL,
                        fee: +req.body.txtCoursePrice,
                        subDescription: req.body.txtShortDes,
                        fullDescription: req.body.txtFullDes,
                        isFinished: false,
                        views: 0,
                        dayPost: moment().format("YYYY-MM-DD"),
                        lastUpdate: moment().format("YYYY-MM-DD"),
                    };

                    if (typeof entity.catID === "undefined") {
                        console.log("Cat id is undefined!");
                        throw new Error("Cat ID is undefined!");
                    }

                    const isAddDiscount = await courseModel.addDiscount(
                        entity.courseID, +req.body.txtCourseDiscount
                    );

                    const firstRet = await courseModel.addCourse(entity);

                    const str = req.body.txtSyllabus;
                    const str2 = str.slice(10, str.length - 12);
                    const arr = str2.split("</li>\r\n<li>");
                    // console.log(arr);
                    const _chapterMaxId = await chapterModel.getChapterMaxId();
                    // console.log(_chapterMaxId[0].chapterMaxID);
                    let chapterMaxId = _chapterMaxId[0].chapterMaxID;
                    // console.log(chapterMaxId);
                    arr.map(async(chapter) => {
                        chapterMaxId++;
                        const entityChapter = {
                            courseID: courseIdToAddChapter,
                            chapterID: chapterMaxId,
                            chapterName: chapter,
                        };
                        const firstRet = await chapterModel.addChapter(entityChapter);
                    });
                    res.render("vwUser/UploadCourse", {
                        layout: "main",
                    });
                }
            });

            // multer

            // res.render("vwUser/UploadCourse", {
            //   layout: "main",
            // });

            // console.log(req.session.authUser);

            // upload.array("ulAva", 3)(req, res, (er) => {
            //   if (er) {
            //     console.log(er);
            //   } else {
            //     console.log("Upload File Success");
            //     res.render("vwUser/UploadCourse", {
            //       layout: "main",
            //     });
            //   }
            // });
        } catch (er) {
            console.log(er);
            return res.status(500).json({ message: er.sqlMessage });
        }
    },

    // get upload course page
    getUploadChapterPage: async(req, res) => {
        const userID = req.session.authUser.userID;
        const allCourse = await courseModel.getAllCouseByInstructorId(userID);
        // console.log(allCourse);
        res.render("vwUser/UploadChapter", {
            layout: "main",
            allCourse,
        });
    },
    // post upload course

    postUploadChapterPage: async(req, res) => {
        console.log("Uploading chapter !!");
        // console.log("alo alo " + req.body);
        const allCourse = await courseModel.all();

        const { chapterName, courseName } = req.body;

        const courseID = courseName.split(" -- ")[0].slice(10);

        const check = await chapterModel.getChapterOfCourseByChapterName(
            courseID,
            chapterName
        );

        const checkChapterNameExisted = check.length == 0 ? 0 : 1;

        if (checkChapterNameExisted) {
            return res.status(500).json({
                message: "The chapter name you have submitted already existed in this course!",
            });
        } else {
            const _chapterMaxId = await chapterModel.getChapterMaxId();
            let chapterMaxId = _chapterMaxId[0].chapterMaxID;
            const entity = {
                courseID,
                chapterID: chapterMaxId + 1,
                chapterName,
            };
            const firstRet = await chapterModel.addChapter(entity);

            const course = await courseModel.getCourseByID(courseID);

            course[0].lastUpdate = moment().format("YYYY-MM-DD");

            console.log(course[0]);

            const updateLastUpdateCourse = await courseModel.editCourse(course[0]);
            console.log(updateLastUpdateCourse);

            res.render("vwUser/UploadChapter", {
                layout: "main",
                allCourse,
            });
        }
    },

    //get cart page
    getCartPage: (req, res) => {
        res.render("vwUser/Cart", {
            layout: "main",
        });
    },

    getUploadUnitPage: async(req, res) => {
        console.log("Get into upload Unit !!");
        // console.log("alo alo " + req.body);

        const userID = req.session.authUser.userID;
        const allInstructorCourse = await courseModel.getAllCouseByInstructorId(
            userID
        );

        const allInstructorChapter = [];
        for (let i = 0; i < allInstructorCourse.length; i++) {
            const chapterSubArr = await chapterModel.getAllChapterByCourseID(
                allInstructorCourse[i].courseID
            );
            chapterSubArr.map((chapter) => {
                allInstructorChapter.push(chapter);
            });
        }
        res.render("vwUser/UploadUnit", {
            layout: "main",
            allInstructorCourse,
            allInstructorChapter,
        });
    },
    // post upload course

    postUploadUnit: async(req, res) => {
        try {
            // avatar
            console.log("Uploading Course !!");
            // console.log("alo alo " + req.body);
            let vidName = "";
            const savePath = `./public/courses/coursevideos-${moment()
        .format("DD-MM-YYYY")
        .slice(0, 2)}`;
            const storage = multer.diskStorage({
                destination: function(req, file, cb) {
                    fs.mkdirSync(savePath, { recursive: true });
                    cb(null, savePath);
                },
                filename: function(req, file, cb) {
                    vidName = file.originalname;
                    //  console.log(file);
                    cb(null, file.originalname);
                },
            });
            // const allCourse = await courseModel.all();
            const upload = multer({ storage });

            upload.single("ulVideo")(req, res, async function(er) {
                if (er) {
                    console.log(er);
                } else {
                    console.log(savePath);
                    // console.log(req.body.videoLength);
                    const check = await unitModel.getUnitOfchapterByUnitName(
                        req.body.chapterID,
                        req.body.unitName
                    );

                    if (check.length > 0) {
                        return res.status(400).json({
                            message: "This unit name already exists in the chapter of course u chose!",
                        });
                    } else {
                        const time = req.body.videoLength;

                        const hour = time.slice(0, 2);

                        const min = time.slice(4, 6);

                        const sec = time.slice(8, 10);

                        const _unitMaxId = await unitModel.getUnitMaxId();
                        let unitMaxId = _unitMaxId[0].unitMaxID;

                        const entity = {
                            unitID: unitMaxId + 1,
                            chapterID: req.body.chapterID,
                            unitContent: req.body.unitName,
                            linkVideo: "../." + savePath + "/" + vidName,
                            flagReviewable: req.body.txtIsReviewable == "on" ? 1 : 0,
                            duration_hour: hour,
                            duration_min: min,
                            duration_sec: sec,
                        };

                        // console.log(entity);
                        const firstRet = await unitModel.addUnit(entity);

                        // console.log(entity);
                        const course = await courseModel.getCourseByID(req.body.courseID);

                        course[0].lastUpdate = moment().format("YYYY-MM-DD");

                        const flagComplete = req.body.txtIsDone == "on" ? 1 : 0;

                        if (flagComplete) {
                            course[0].isFinished = 1;
                        }
                        // console.log(course);

                        const secondRet = await courseModel.editCourse(course[0]);

                        const userID = req.session.authUser.userID;
                        const allInstructorCourse = await courseModel.getAllCouseByInstructorId(
                            userID
                        );

                        const allInstructorChapter = [];
                        for (let i = 0; i < allInstructorCourse.length; i++) {
                            const chapterSubArr = await chapterModel.getAllChapterByCourseID(
                                allInstructorCourse[i].courseID
                            );
                            chapterSubArr.map((chapter) => {
                                allInstructorChapter.push(chapter);
                            });
                        }
                        res.render("vwUser/UploadUnit", {
                            layout: "main",
                            allInstructorCourse,
                            allInstructorChapter,
                        });
                    }
                }
            });

            // multer

            // res.render("vwUser/UploadCourse", {
            //   layout: "main",
            // });

            // console.log(req.session.authUser);

            // upload.array("ulAva", 3)(req, res, (er) => {
            //   if (er) {
            //     console.log(er);
            //   } else {
            //     console.log("Upload File Success");
            //     res.render("vwUser/UploadCourse", {
            //       layout: "main",
            //     });
            //   }
            // });
        } catch (er) {
            console.log(er);
            return res.status(500).json({ message: er.sqlMessage });
        }
    },

    postCart: async(req, res) => {},

    getLockAccountPage: (req, res) => {
        res.render("vwUser/LockAccount", {
            layout: false,
            message: "Your Account Has Been Locked",
            reason: "",
        });
    },
};

module.exports = userController;