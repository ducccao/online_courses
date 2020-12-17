const express = require("express");
const adminController = require("./../controllers/admin.controller");
const router = express.Router();

// get dashboard
router.get("/dashboard", adminController.getDashboard);

// get all categories
router.get("/categories", adminController.getAllCategories);

// add cate
router.post("/categories/add", adminController.addCate);

// get add cate page
router.get("/categories/add", adminController.getAddCatePage);

// get cate by id
router.get("/categories/:id", adminController.getCateByID);

// 404 not found
router.get("*", adminController.getNotfound);

module.exports = router;
