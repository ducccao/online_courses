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

// get Edit cate
router.get("/categories/edit", adminController.getEditCatePage);

// post Edit cate
router.post("/categories/edit", adminController.editCate);

// get del cate
router.get("/categories/delete", adminController.getDelCatePage);

// delete del cate
router.delete("/categories/delete", adminController.delCate);

// get detail cat
router.get("/categories/detailCat/:id", adminController.getDetailCat);

//   throw new Error("access denied");

// 404 not found
router.get("*", adminController.getNotfound);

module.exports = router;
