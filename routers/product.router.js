const express = require("express");
const router = express.Router();
const productModel = require("./../models/product.model");

router.get("/", async (req, res) => {
  const all_products = await productModel.all();

  res.render("vwProducts", {
    products: all_products,
    isEmpty: all_products.length === 0,
  });
});

module.exports = router;
