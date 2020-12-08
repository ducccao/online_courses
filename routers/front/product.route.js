const express = require("express");
const router = express.Router();
const productModel = require("./../../models/product.model");

router.get("/byCate/:id", async(req, res) => {
    const cateID = req.params.id;

    for (const c of res.locals.lcCategories) {
        if (c.cateID === +cateID) {
            c.isActive = true;
        }
    }
    const rows = await productModel.byCate(cateID);
    res.render("vwProducts/byCate", {
        products: rows,
        isEmpty: rows.length === 0,
    });
});

module.exports = router;