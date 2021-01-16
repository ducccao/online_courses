const adminModel = require("./../models/admin.model");
const usersDatabase = require("./../utils/usersDatabase");
const categoryModel = require("./../models/category.model");
const fakeCateDB = require("./../utils/categoryDatabase");
const courseModel = require("./../models/course.model");
const config = require("./../config/default.json");
const { reset } = require("numeral");
const moment = require("moment");

const courseController = {
    /* #region  Course */
    // get all course page
    getAllCoursePage: async(req, res) => {
        console.log("Get all course page");
        const allCourse = await courseModel.all();
        //  console.log(allCourse);

        // pagi
        const courseID = +req.params.id;

        let page = +req.query.page || 1;

        if (page < 0) {
            page = 1;
        }

        const limit = config.admin.course.pagination.limit;
        const offset = (page - 1) * limit;
        const rows = await courseModel.pagiCourse(offset);
        const total = allCourse.length;
        const nPage = Math.ceil(total / limit);
        const pagiItem = [];

        for (let i = 1; i <= nPage; i++) {
            const item = {
                value: i,
                isActive: page === i,
            };
            pagiItem.push(item);
        }
        const secondRows = [];
        for (let i = 0; i < rows.length; ++i) {
            const catOfCourse = await courseModel.getCatName(rows[i].courseID);
            //   console.log("cat of course", catOfCourse);
            secondRows.push({
                ...rows[i],
                catName: catOfCourse[0].catName,
            });
        }
        let thirdRows = [];
        for (let nh = 0; nh < secondRows.length; ++nh) {
            const insOfCourse = await courseModel.getInstructorOfCourse(
                secondRows[nh].courseID
            );
            thirdRows.push({
                ...secondRows[nh],
                instructorName: insOfCourse[0].userName,
            });
            //  console.log(insOfCourse);
        }

        const allInstructor = await courseModel.getAllInstructor();
        const allCatName = await categoryModel.getAllCatName();

        if (req.query.instructor) {
            console.log("req query ", req.query);
            let instructor = req.query.instructor || "";
            thirdRows = thirdRows.filter((item) => {
                //console.log(item.instructorName);
                //   console.log(instructor);
                return item.instructorName === instructor;
            });
        }
        //console.log(thirdRows);

        if (req.query.catName) {
            let catName = req.query.catName;
            thirdRows = thirdRows.filter((item) => {
                return item.catName === catName;
            });
        }

        // check is Disable Course ?
        const fourRows = [];
        for (let crush = 0; crush < thirdRows.length; ++crush) {
            if (thirdRows[crush].isDisabled !== 1) {
                fourRows.push({
                    ...thirdRows[crush],
                });
            }
        }

        //console.log(thirdRows);

        //console.log(secondRows);

        //   console.log(rows);
        //console.log(thirdRows);

        res.render("vwAdminCourse/AllCourses", {
            layout: "admin",
            headerTitle: "All Courses",
            allCourse: fourRows,
            empty: fourRows.length === 0,
            // sort
            listCat: allCatName,
            listIns: allInstructor,

            // pagi
            showPagi: true,
            pagiItem: pagiItem,
            can_go_prev: page > 1,
            can_go_next: page < nPage,
            go_next_page: page + 1,
            go_previous_page: page - 1,
        });
    },
    // get add course page
    getAddCoursesPage: (req, res) => {
        const today = new Date();
        const atContinuos = {
            dd: today.getDate(),
            mm: today.getMonth(),
            yyyy: today.getFullYear(),
        };
        console.log(atContinuos);
        res.render("vwAdminCourse/AddCourse", {
            layout: "admin",
            headerTitle: "Add Courses",
        });
    },
    // add course
    addCourse: async(req, res) => {
        try {
            console.log("Adding New Course!");
            const bodyData = req.body;

            const data = {
                courseName: bodyData.courseName,
                title: bodyData.title,
                catID: bodyData.catID,
                avatar: bodyData.avatar,
                fee: bodyData.fee,
                fusDes: bodyData.fusDes,
                subDes: bodyData.subDes,
            };

            // console.log(bodyData);

            const isCourseNameExists = await courseModel.getCourseByName(
                data.courseName
            );
            if (isCourseNameExists.length !== 0) {
                return res.status(400).json({ message: "Course Is Exists!" });
            }

            const isExistsCat = await categoryModel.getCateByID(data.catID);
            //  console.log(isExistsCat);
            if (isExistsCat.length === 0) {
                return res.status(400).json({ message: "Category Invalid!" });
            }

            const allCourse = await courseModel.all();

            const user = req.session.authUser;

            const today = new Date();
            const atContinuos = {
                dd: today.getDate(),
                mm: today.getMonth(),
                yyyy: today.getFullYear(),
            };
            //    console.log(atContinuos);

            // console.log("In add course page, user active is: ", user);
            const entity = {
                ...req.body,
                userID: user.userID,
                thumbnail: "random thumbnail",
                isFinished: 1,
                dayPost: moment().format("YYYY-MM-DD"),
                lastUpdate: moment().format("YYYY-MM-DD"),
                courseID: allCourse.length + 1,
            };

            const addCourse = await courseModel.addCourse(entity);

            // console.log(addCourse);

            res.render("vwAdminCourse/AllCourses", {
                layout: "admin",
                headerTitle: "Add Courses",
            });
        } catch (er) {
            //console.log(er);
            return res.status(500).json({ message: er.sqlMessage });
        }
    },

    // get edit course page
    getEditCoursePage: (req, res) => {
        res.render("vwAdminCourse/AllCourses", {
            layout: "admin",
        });
    },
    // edit course
    editCourse: (req, res) => {
        res.render("vwAdminCourse/AllCourses", {
            layout: "admin",
        });
    },
    // get del course page
    getDelCoursePage: (req, res) => {
        console.log("Get del course page!");
        res.render("vwAdminCourse/DeleteCourse", {
            layout: "admin",
            headerTitle: "Delete Course",
        });
    },
    // del course
    delCourse: async(req, res) => {
        console.log("Deleting course!");
        //console.log(req.body);

        const { courseID } = req.body;
        const courseByID = await courseModel.getCourseByID(courseID);

        if (courseByID.length === 0) {
            return res.status(404).json({ message: "Course does not exists!" });
        }

        const entity = {
            courseID: courseID,
        };

        const delCourse = await courseModel.delCourse(entity);

        if (delCourse.affectedRows === 1) {
            res.status(200);
            res.render("vwAdminCourse/DeleteCourse", {
                layout: "admin",
                headerTitle: "Delete Course",
            });
            return;
        }

        return res.status(404).json({ message: "Something when wrong!" });
    },
    getDetailCourse: (req, res) => {
        res.render("vwAdminCourse/AllCourses", {
            layout: "admin",
        });
    },

    /* #endregion */
    getDisableCoursePage: (req, res) => {
        res.render("vwAdminCourse/Disable", {
            layout: "admin",
        });
    },
    DisableCourse: async(req, res) => {
        try {
            const courseID = req.body.courseID;
            //console.log(courseID);

            const ret1 = await courseModel.disableCourse(courseID);
            //console.log(ret1);

            if (+ret1.affectedRows === 0) {
                return res.status(500).json({ message: "Course Not Found!" });
            }
            return res.status(200).json({ message: "Disabled Course!" });
        } catch (er) {
            console.log(er);

            return res.status(500).json({ message: er.sqlMessage });
        }
    },

    getEnableCourse: (req, res) => {
        res.render("vwAdminCourse/Enable", {
            layout: "admin",
        });
    },
    EnableCourse: async(req, res) => {
        try {
            const courseID = req.body.courseID;
            const ret1 = await courseModel.enableCourse(courseID);
            console.log(ret1);
            if (+ret1.affectedRows === 0) {
                return res.status(500).json({ message: "Course Not Found!" });
            }
            return res.status(200).json({ message: "Enabled Course!" });
        } catch (er) {
            console.log(er);
            return res.status(500).json({ message: er.sqlMessage });
        }
    },
};

module.exports = courseController;