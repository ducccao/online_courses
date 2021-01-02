const categoryModel = require("./../models/category.model");
const userModel = require("./../models/user.model");
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
    // console.log(req.session.authUser);
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

  app.use(async function (req, res, next) {
    if (req.session.authUser) {
      const user = req.session.authUser;
      const rows = await userModel.getCartQuantity(user.userID);
      console.log(rows);
      res.locals.lcCartQuantity = rows[0].quantity;
      next();
      return;
    }

    next();
  });
};
