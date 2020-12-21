const express = require("express");
const router = express.Router();
const mainController = require("./../controllers/main.controller");
const auth = require("./../middlewares/auth.mdw");

// get course list page
router.get("/course-list", mainController.getCourseList);

module.exports = router;
