const { get } = require("./main.router");

const express = require("express");
const router = express.Router();
const accountController = require("../controllers/account.controller");

router.get("/profile", accountController.getProfile);
router.get("/changePass", accountController.getChangePass);
router.get("/photo", accountController.getPhoto);
router.get("/favorite", accountController.getProfile);
router.get("/allCourse", accountController.getProfile);
router.get("/signOut", accountController.getLogOut);

router.post("/profile", accountController.postProfile);
router.post("/changePass", accountController.postChangePass);

router.get("/purchased-course", accountController.getPurchasedCourses);

module.exports = router;