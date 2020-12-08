const express = require("express");
const mysql = require("mysql");
const router = express.Router();
const db = require("./../utils/db");
const categoryModel = require("../models/category.model");

// get all
router.get("/", async (req, res) => {
  const all_categories = await categoryModel.all();
  res.render("vwCategories", {
    categories: all_categories,
    isEmpty: all_categories.length === 0,
  });
});

// add cate
router.get("/add", (req, res) => {
  res.render("vwCategories/add");
});

// add cate
router.post("/add", async (req, res) => {
  const all_categories = await categoryModel.all();
  console.log("Adding new category!");
  const newCat = {
    ...req.body,
    cateID: all_categories.length++,
  };
  //console.log(newCat);
  const ret = await categoryModel.add(newCat);
  //console.log(ret);

  console.log("Add cate success!");
  res.render("vwCategories/add");
});

// edit cate
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const category = await categoryModel.single(id);

  if (category === null) {
    return res.redirect("/admin/categories");
  }

  console.log(category);

  res.render("vwCategories/edit", {
    category,
  });
});

// delete cate
router.post("/del", async (req, res) => {
  const ret = await categoryModel.del(req.body);
  console.log("Deleting category");
  res.redirect("/admin/categories");
  console.log("Deleted category!");
});

// edit
router.post("/patch", async (req, res) => {
  const ret = await categoryModel.patch(req.body);
  res.redirect("/admin/categories");
});

module.exports = router;
