const express = require("express");
const mysql = require("mysql");
const router = express.Router();
const db = require("./../utils/db");
const categoryModel = require("../models/category.model");

router.get("/", async (req, res) => {
  const all_categories = await categoryModel.all();
  res.render("vwCategories", {
    categories: all_categories,
    isEmpty: all_categories.length === 0,
  });
});

router.get("/add", (req, res) => {
  res.render("vwCategories/add");
});

router.post("/add", async (req, res) => {
  const all_categories = await categoryModel.all();
  const newCat = {
    ...res.body,
    cateID: all_categories.length++,
  };
  console.log(newCat);
  const ret = await categoryModel.add(newCat);
  console.log(ret);

  res.render("vwCategories/add");
});

module.exports = router;
