const { get } = require("./main.router");

const express = require("express");
const router = express.Router();
const accountController = require("../controllers/account.controller");
const {
    auth,
    authAdmin,
    authNav,
    authOTP,
} = require("./../middlewares/auth.mdw");

router.get("/profile", auth, authOTP, accountController.getProfile);
router.get("/changePass", auth, authOTP, accountController.getChangePass);
router.get("/photo", auth, authOTP, accountController.getPhoto);
router.get("/favorite", auth, authOTP, accountController.getProfile);
router.get("/allCourse", auth, authOTP, accountController.getProfile);
router.get("/signOut", auth, authOTP, accountController.getLogOut);

router.post("/profile", auth, authOTP, accountController.postProfile);
router.post("/changePass", auth, authOTP, accountController.postChangePass);

router.get(
    "/purchased-course",
    auth,
    authOTP,
    accountController.getPurchasedCourses
);

router.get(
    "/my-courses",
    auth,
    authOTP,
    accountController.getInstructorCourse
);

module.exports = router;