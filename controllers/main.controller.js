const cateModel = require("./../models/category.model");
const courseModel = require("./../models/course.model");

const mainController = {
  // get List Course page
  getListCourses: async (req, res) => {
    //  const allCate = await cateModel.all();
    const courseInCat = await cateModel.allWithDetails();
    //console.log(courseInCat);
    const allCourse = await courseModel.all();
    // console.log(allCourse);

    res.render("vwMain/ListCourses", {
      layout: "main",
      courseInCat: courseInCat,
      allCourse: allCourse,
      showPagi: true,
    });
  },
};

module.exports = mainController;
