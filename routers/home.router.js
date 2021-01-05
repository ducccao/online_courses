const express = require("express");
const homeController = require("../controllers/home.controller");
const router = express.Router();
const mainController = require("./../controllers/main.controller");
const { auth, authNav, authOTP } = require("./../middlewares/auth.mdw");

router.get("/", authNav, homeController.getListCourses);

module.exports = router;