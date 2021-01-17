const express = require("express");
const userController = require("./../controllers/user.controller");
const router = express.Router();
const {
    auth,
    authAdmin,
    authNav,
    authOTP,
} = require("./../middlewares/auth.mdw");

// login get
router.get("/login", userController.getLogin);

// login post
router.post("/login", userController.postLogin);

// logout post
router.post("/logout", userController.postLogout);

// register get
router.get("/register", userController.getRegister);

// register post
router.post("/register", userController.postRegister);

// get verify
router.get("/verify/:id", userController.getVerify);

// get prevent access page
router.get("/prevent-access", userController.preventUserAccess);

// forgot password
router.get(
    "/forgot-password",
    auth,
    authOTP,
    authNav,
    userController.getForgotPassword
);

// get profile
router.get("/profile", auth, authOTP, authNav, userController.getProfile);

// get upload course
router.get(
    "/upload-course",
    auth,
    authNav,
    authOTP,
    userController.getUploadCoursePage
);
// post upload course
router.post("/upload-course", auth, authNav, userController.postUploadCourse);

router.get(
    "/upload-chapter",
    auth,
    authNav,
    authOTP,
    userController.getUploadChapterPage
);

router.post("/upload-chapter", authOTP, userController.postUploadChapterPage);

router.get(
    "/upload-unit",
    auth,
    authNav,
    authOTP,
    userController.getUploadUnitPage
);

router.post("/upload-unit", auth, userController.postUploadUnit);

router.get(
    "/locked",

    userController.getLockAccountPage
);

module.exports = router;