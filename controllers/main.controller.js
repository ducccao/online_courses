const cateModel = require("./../models/category.model");
const courseModel = require("./../models/course.model");
const userModel = require("./../models/user.model");
const config = require("./../config/default.json");
const { averageArrayRating } = require("./../utils/utilsFunction");

const mainController = {
  // get List Course page
  getListCourses: async (req, res) => {
    console.log("List Course Paginating!!");
    //  const allCate = await cateModel.all();
    const courseInCat = await cateModel.allWithDetails();
    //console.log(courseInCat);
    const allCourse = await courseModel.all();
    // console.log(allCourse);
    //  let isAdmin = false;
    //console.log("main controller: ", req.session.authUser);
    let page = +req.query.page || 1;
    if (page < 0) {
      page = 1;
    }
    const limit = config.listCourses.pagination.limit;
    // console.log(limit);
    const offset = (page - 1) * 6;
    // console.log(offset);
    const rows = await courseModel.pagiListCourse(offset, limit);
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

    // get cat type
    const nextRows = [];

    for (let i = 0; i < rows.length; i++) {
      const catLevel = await courseModel.getTypeOfCourse(
        rows[i].courseID,
        rows[i].catID
      );
      //  console.log(rows[i]);
      console.log(catLevel);
      const item = {
        ...rows[i],
        catLevel: catLevel.length !== 0 ? catLevel[0].catLevel : 0,
      };
      nextRows.push(item);
    }
    //  console.log(rows);
    // const typeOfCourse = await courseModel.getTypeOfCourse(1, 1);
    // console.log(nextRows);

    // instructor
    const thirdRows = [];
    for (let i = 0; i < nextRows.length; ++i) {
      const instructor = await courseModel.getInstructor(
        nextRows[i].courseID,
        nextRows[i].userID
      );
      //console.log(instructor);
      const item = {
        ...nextRows[i],
        ...instructor[0],
      };
      thirdRows.push(item);
    }
    // console.log(thirdRows[0]);
    // rating course
    const fourthRows = [];
    for (let i = 0; i < thirdRows.length; i++) {
      // rating
      const ratingArray = await courseModel.getRatingCourse(
        thirdRows[i].courseID
      );
      const averageRating = averageArrayRating(ratingArray);
      //   console.log(averageRating);
      // discount
      const discount = await courseModel.getDiscountCourse(
        thirdRows[i].courseID
      );
      //  console.log(discount);
      const item = {
        ...thirdRows[i],
        rating: typeof +averageRating === "number" ? averageRating : 0,
        countPeopleRating: ratingArray.length,
        discount: discount.length !== 0 ? discount[0].percent : 0,
      };
      fourthRows.push(item);
    }
    // console.log(fourthRows);

    res.render("vwMain/ListCourses", {
      layout: "main",
      courseInCat: courseInCat,
      allCourse: fourthRows,
      //   isAdmin: isAdmin,
      //pagi
      showPagi: true,
      pagiItem: pagiItem,
      can_go_prev: page > 1,
      can_go_next: page < nPage,
      go_next_page: page + 1,
      go_previous_page: page - 1,
    });
  },
  // get course list by cat
  getCourseListByCat: async (req, res) => {
    console.log("Get list course by cat !");
    const courseInCat = await cateModel.allWithDetails();
    //  console.log(courseInCat);
    const allCourse = await courseModel.all();
    const catID = +req.params.id;
    let page = +req.query.page || 1;

    if (page === 0) {
      page = 1;
    }

    let total = 0;
    for (let i = 0; i < courseInCat.length; i++) {
      //  console.log(courseInCat[i].catID);
      if (+courseInCat[i].catID === +catID) {
        //  console.log("trueasds");
        total = courseInCat[i].CourseCount;
      }
    }

    const limit = config.listCourses.pagination.limit;
    const offset = (page - 1) * limit;
    const rows = await courseModel.pagiListCourseByCat(catID, offset, limit);
    //   console.log("row len: ", rows.length);
    //  console.log("total ", total);
    const nPage = Math.ceil(total / limit);
    const pagiItem = [];
    for (let i = 1; i <= nPage; ++i) {
      const item = {
        value: i,
        isActive: page === i,
      };
      pagiItem.push(item);
    }

    // get cat type
    const nextRows = [];

    for (let i = 0; i < rows.length; i++) {
      const catLevel = await courseModel.getTypeOfCourse(
        rows[i].courseID,
        rows[i].catID
      );
      //  console.log(rows[i]);
      // console.log(catLevel);
      const item = {
        ...rows[i],
        catLevel: catLevel[0].catLevel,
      };
      nextRows.push(item);
    }
    //  console.log(rows);
    // const typeOfCourse = await courseModel.getTypeOfCourse(1, 1);
    // console.log(nextRows);

    // instructor
    const thirdRows = [];
    for (let i = 0; i < nextRows.length; ++i) {
      const instructor = await courseModel.getInstructor(
        nextRows[i].courseID,
        nextRows[i].userID
      );
      //console.log(instructor);
      const item = {
        ...nextRows[i],
        ...instructor[0],
      };
      thirdRows.push(item);
    }
    // console.log(thirdRows[0]);
    // rating course
    const fourthRows = [];
    for (let i = 0; i < thirdRows.length; i++) {
      // rating
      const ratingArray = await courseModel.getRatingCourse(
        thirdRows[i].courseID
      );
      const averageRating = averageArrayRating(ratingArray);
      //   console.log(averageRating);
      // discount
      const discount = await courseModel.getDiscountCourse(
        thirdRows[i].courseID
      );
      //    console.log(discount);
      const item = {
        ...thirdRows[i],
        rating: typeof +averageRating === "number" ? averageRating : 0,
        countPeopleRating: ratingArray.length,
        discount: discount.length !== 0 ? discount[0].percent : 0,
      };
      fourthRows.push(item);
    }
    // console.log(fourthRows);

    res.render("vwMain/ListCourses", {
      layout: "main",
      courseInCat: courseInCat,
      allCourse: fourthRows,
      empty: rows.length === 0,
      //pagi
      showPagi: true,
      pagiItem: pagiItem,
      can_go_prev: page > 1,
      can_go_next: page < nPage,
      go_next_page: page + 1,
      go_previous_page: page - 1,
    });
  },
};

module.exports = mainController;
