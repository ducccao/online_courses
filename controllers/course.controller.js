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
  getAllCoursePage: async (req, res) => {
    console.log("Get all course page");
    const allCourse = await courseModel.all();
    //  console.log(allCourse);

    // pagi
    const courseID = +req.params.id;

    let page = +req.query.page || 1;

    if (page < 0) {
      page = 1;
    }

    const limit = config.pagination.limit;
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

    res.render("vwAdminCourse/AllCourses", {
      layout: "admin",
      headerTitle: "All Courses",
      allCourse: rows,
      empty: rows.length === 0,

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
  addCourse: async (req, res) => {
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
  delCourse: async (req, res) => {
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
};

module.exports = courseController;
