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
router.get("/forgot-password", userController.getForgotPassword);

// get profile
router.get("/profile", auth, authOTP, userController.getProfile);

// get upload course
router.get("/upload-course", auth, authNav, userController.getUploadCoursePage);
// post upload course
router.post("/upload-course", authOTP, userController.postUploadCourse);

module.exports = router;
