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

        if (isUserExists[0].decentralization === 2 && password === "admin") {
            req.session.isAuth = true;
            req.session.authUser = isUserExists[0];

            return res.json({ redirect: "/admin/dashboard" });
        }

        if (isUserExists[0].decentralization === 1 && password === "123") {
            req.session.isAuth = true;
            req.session.authUser = isUserExists[0];

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
            //    console.log(req.body);
            let avaName = "";
            const storage = multer.diskStorage({
                destination: function(req, file, cb) {
                    cb(null, "./public/course/img/");
                },
                filename: function(req, file, cb) {
                    avaName = file.originalname;
                    //  console.log(file);
                    cb(null, file.originalname);
                },
            });

            const upload = multer({ storage });

            upload.single("ulAva")(req, res, async function(er) {
                console.log(req.body);
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
                    console.log(avaName);
                    const avataURL = `${config.devURL}/public/course/img/${avaName}`;
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
                        return res.status(400).json({ message: "Course Is Exists!" });
                    }
                    //  console.log("Cat ID: ", isCatExists[0].catID);

                    const entity = {
                        courseID: allCourse.length + Math.random() * 3000,
                        courseName: req.body.courseName,
                        title: "",
                        catID: isCatExists[0].catID,
                        userID: req.session.authUser.userID,
                        thumbnail: "",
                        avatar: avataURL,
                        fee: +req.body.txtCoursePrice,
                        subDescription: req.body.txtShortDes,
                        fullDescription: req.body.txtFullDes,
                        isFinished: req.body.txtIsDone === "on" ? true : false,
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
                    //console.log(firstRet);
                    //console.log(isAddDiscount);
                    //console.log("entity ", entity);

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
};

module.exports = userController;