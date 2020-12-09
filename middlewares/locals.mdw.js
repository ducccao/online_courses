const categoryModel = require("./../models/category.model");

module.exports = async function loadCategories(req, res, next) {
    const rows = await categoryModel.allWithDetails();
    // console.log("Load cate", rows);
    // local categories - save it into local
    res.locals.lcCategories = rows;
    next();
};