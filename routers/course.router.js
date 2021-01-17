const express = require("express");
const router = express.Router();
const courseController = require("./../controllers/course.controller");
const adminController = require("./../controllers/admin.controller");
const {
    auth,
    authAdmin,
    authOTP,
    authNav,
} = require("./../middlewares/auth.mdw");
/* #region  Course */

// get all Course
router.get("/courses", authAdmin, courseController.getAllCoursePage);

// add course
router.post("/courses/add", authAdmin, courseController.addCourse);

// get add courses page
router.get("/courses/add", authAdmin, courseController.getAddCoursesPage);

// get Edit courses
router.get("/courses/edit", authAdmin, courseController.getEditCoursePage);

// post Edit cate
router.post("/courses/edit", authAdmin, courseController.editCourse);

// get del courses
router.get("/courses/delete", authAdmin, courseController.getDelCoursePage);

// delete del cate
router.delete("/courses/delete", authAdmin, courseController.delCourse);

// get detail cat
router.get(
    "/courses/detailCourse/:id",
    authAdmin,
    courseController.getDetailCourse
);

router.get(
    "/courses/disable",
    authAdmin,
    courseController.getDisableCoursePage
);
router.put("/courses/disable", authAdmin, courseController.DisableCourse);

router.get("/courses/enable", authAdmin, courseController.getEnableCourse);
router.put("/courses/enable", authAdmin, courseController.EnableCourse);

/* #endregion */

// 404 not found
router.get("*", adminController.getNotfound);
module.exports = router;