const categoryModel = require("./../models/category.model");
const express = require("express");

module.exports = function (app) {
  // body parser bug
  app.use(
    express.urlencoded({
      extended: true,
    })
  );

  // get session right there
  app.use(async function (req, res, next) {
    //console.log(req.session);
    if (typeof req.session.isAuth === "undefined") {
      req.session.isAuth = false;
    }

    res.locals.isAuth = req.session.isAuth;
    res.locals.authUser = req.session.authUser;

    next();
  });

  // locals to hbs get variables
  app.use(async function (req, res, next) {
    const rows = await categoryModel.allWithDetails();
    res.locals.lcCategories = rows;
    next();
  });
};
