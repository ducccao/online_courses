const express = require("express");
const adminController = require("./../controllers/admin.controller");
const router = express.Router();
const { auth, authAdmin } = require("./../middlewares/auth.mdw");

/* #region  Category */

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

router.get("/students/all", authAdmin, adminController.getAllStudentPage);

router.get("/students/add", authAdmin, adminController.getAddStudentPage);
router.post("/students/add", authAdmin, adminController.postStudent);

router.get("/students/put", authAdmin, adminController.getPutStudentPage);
router.put("/students", authAdmin, adminController.PutStudent);

router.get("/students/delete", authAdmin, adminController.getDeleteStudentPage);
router.delete("/students", authAdmin, adminController.deleteStudent);

router.get(
    "/instructors/all",
    authAdmin,
    adminController.getAllInstructorRecordPage
);

router.get(
    "/instructors/lock",
    authAdmin,
    adminController.getLockAccountInstructorPage
);
router.put(
    "/instructors/lock",
    authAdmin,
    adminController.putLockAccountInstructor
);

/* #endregion */

//   throw new Error("access denied");

module.exports = router;