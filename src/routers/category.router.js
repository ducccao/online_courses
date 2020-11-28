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
