const express = require("express");
const userController = require("./../controllers/user.controller");
const router = express.Router();

// login get
router.get("/login", userController.getLogin);

// login post
router.post("/login", userController.postLogin);

// register get
router.get("/register", userController.getRegister);

// forgot password
router.get("/forgot-password", userController.getForgotPassword);

module.exports = router;
