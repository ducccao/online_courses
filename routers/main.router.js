const express = require("express");
const router = express.Router();
const mainController = require("./../controllers/main.controller");
const { auth, authNav, authOTP } = require("./../middlewares/auth.mdw");

// get course list page

router.get("/course-list", authNav, mainController.getListCourses);

// get course list by cat
router.get(
    "/course-list/byCat/:id",
    authNav,
    mainController.getCourseListByCat
);

router.get(
    "/course-list/:id",
    authNav,
    mainController.getCourseDetail
);

router.post(
    "/course-list/search",
    mainController.searchCourse
);
router.get(
    "/course-list/search",
    mainController.searchCourse
);

router.get("/course/learn/:id", mainController.getLearnCoure)

module.exports = router;