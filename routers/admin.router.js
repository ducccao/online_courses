const express = require("express");
const adminController = require("./../controllers/admin.controller");
const router = express.Router();
const { auth, authAdmin } = require("./../middlewares/auth.mdw");

// get dashboard
router.get("/dashboard", authAdmin, adminController.getDashboard);

// get all categories
router.get("/categories", authAdmin, adminController.getAllCategories);

// add cate
router.post("/categories/add", authAdmin, adminController.addCate);

// get add cate page
router.get("/categories/add", authAdmin, adminController.getAddCatePage);

// get Edit cate
router.get("/categories/edit", authAdmin, adminController.getEditCatePage);

// post Edit cate
router.post("/categories/edit", authAdmin, adminController.editCate);

// get del cate
router.get("/categories/delete", authAdmin, adminController.getDelCatePage);

// delete del cate
router.delete("/categories/delete", authAdmin, adminController.delCate);

// get detail cat
router.get(
  "/categories/detailCat/:id",
  authAdmin,
  adminController.getDetailCat
);

//   throw new Error("access denied");

// 404 not found
router.get("*", adminController.getNotfound);

module.exports = router;
