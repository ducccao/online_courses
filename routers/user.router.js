const express = require("express");
const userController = require("./../controllers/user.controller");
const router = express.Router();
const { auth, authAdmin } = require("./../middlewares/auth.mdw");

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

// forgot password
router.get("/forgot-password", userController.getForgotPassword);

// get profile
router.get("/profile", auth, userController.getProfile);

module.exports = router;
