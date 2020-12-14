const express = require("express");
const adminController = require("./../controllers/admin.controller");
const router = express.Router();

// get dashboard
router.get("/dashboard", adminController.getDashboard);

// get categories
router.get("/categories", adminController.getCategories);

// 404 not found
router.get("*", adminController.getNotfound);

module.exports = router;
