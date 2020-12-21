const mainController = {
  getCourseList: (req, res) => {
    res.render("vwMain/CourseList", {
      layout: "main",
    });
  },
};

module.exports = mainController;
