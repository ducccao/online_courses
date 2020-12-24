const cateModel = require("./../models/category.model");
const courseModel = require("./../models/course.model");
const userModel = require("./../models/user.model");

const mainController = {
  // get List Course page
  getListCourses: async (req, res) => {
    //  const allCate = await cateModel.all();
    const courseInCat = await cateModel.allWithDetails();
    //console.log(courseInCat);
    const allCourse = await courseModel.all();
    // console.log(allCourse);
    let isAdmin = false;
    console.log(req.session.authUser);
    if (req.session.authUser !== null) {
      if (req.session.authUser.decentralization === 2) {
        isAdmin = true;
      } else {
        isAdmin = false;
      }
    }

    res.render("vwMain/ListCourses", {
      layout: "main",
      courseInCat: courseInCat,
      allCourse: allCourse,
      showPagi: true,
      isAdmin: isAdmin,
    });
  },
};

module.exports = mainController;
