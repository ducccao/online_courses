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

router.get("/profile", auth, authOTP, authNav, accountController.getProfile);
router.get(
    "/changePass",
    auth,
    authOTP,
    authNav,
    accountController.getChangePass
);
router.get("/photo", auth, authOTP, authNav, accountController.getPhoto);
router.get("/favorite", auth, authOTP, authNav, accountController.getProfile);
router.get("/allCourse", auth, authOTP, authNav, accountController.getProfile);
router.get("/signOut", auth, authOTP, authNav, accountController.getLogOut);

router.post("/profile", auth, authOTP, accountController.postProfile);
router.post("/changePass", auth, authOTP, accountController.postChangePass);

router.get(
    "/purchased-course",
    auth,
    authOTP,
    authNav,
    accountController.getPurchasedCourses
);

router.get(
    "/my-courses",
    auth,
    authOTP,
    authNav,
    accountController.getInstructorCourse
);

module.exports = router;