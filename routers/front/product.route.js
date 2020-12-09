const express = require("express");
const router = express.Router();
const productModel = require("./../../models/product.model");
const config = require("./../../config/default.json");

router.get("/byCate/:id", async(req, res) => {
    const cateID = +req.params.id;

    for (const c of res.locals.lcCategories) {
        if (c.cateID === +cateID) {
            c.isActive = true;
        }
    }

    // get page in req query page
    const page = +req.query.page || 1;
    if (page < 0) {
        page = 1;
    }

    const offset = (page - 1) * config.pagination.limit;
    //console.log("offset ", offset);

    // const rows = await productModel.pageByCate(cateID, offset);
    //const total = await productModel.countByCate(cateID);

    const [rows, total] = await Promise.all([
        productModel.pageByCate(cateID, offset),
        productModel.countByCate(cateID),
    ]);

    let nPage = Math.ceil(total / config.pagination.limit);

    const pageItem = [];
    for (let i = 1; i <= nPage; i++) {
        const item = {
            value: i,
            isActive: page === i,
        };
        pageItem.push(item);
    }

    // console.log(pageItem);

    res.render("vwProducts/byCate", {
        products: rows,
        isEmpty: rows.length === 0,
        pageItem: pageItem,

        can_go_prev: page > 1,
        can_go_next: page < nPage,

        nextPage: page + 1,
        previousPage: page - 1,
        currentPage: page,
    });

    // const rows = await productModel.byCate(cateID);
    // res.render("vwProducts/byCate", {
    //     products: rows,
    //     isEmpty: rows.length === 0,
    // });
});

//router.get("/")

module.exports = router;