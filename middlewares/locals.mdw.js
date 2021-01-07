const categoryModel = require("./../models/category.model");
const userModel = require("./../models/user.model");
const subjectsModel = require("./../models/subjects.model");
const courseModel = require("./../models/course.model");
const express = require("express");
const moment = require("moment");
module.exports = function(app) {
    // body parser bug
    app.use(
        express.urlencoded({
            extended: true,
        })
    );

    // get session right there
    app.use(async function(req, res, next) {
        //console.log(req.session);
        if (typeof req.session.isAuth === "undefined") {
            req.session.isAuth = false;
            req.session.cart = [];
        }
        // console.log(req.session.authUser);
        res.locals.isAuth = req.session.isAuth;
        res.locals.authUser = req.session.authUser;

        next();
    });

    // locals to hbs get variables
    app.use(async function(req, res, next) {
        const rows = await categoryModel.allWithDetails();
        res.locals.lcCategories = rows;
        next();
    });

    app.use(async function(req, res, next) {
        const rows = await subjectsModel.all();
        res.locals.lcSubjects = rows;
        //  console.log(rows);
        next();
    });

    app.use(async function(req, res, next) {
        const rows = await categoryModel.all();
        res.locals.lcAllCategories = rows;
        // console.log(rows);
        next();
    });

    // app.use(async function(req, res, next) {
    //     const rows = await courseModel.getAllDiscountCourse();
    //     res.locals.lcCourse = rows;
    //         // console.log(rows);
    //     next();
    // });

    app.use(async function(req, res, next) {
        if (req.session.authUser) {
            const user = req.session.authUser;
            const rows = await userModel.getCartQuantity(user.userID);
            //  console.log(rows);
            res.locals.lcCartQuantity = rows[0].quantity;
            next();
            return;
        }
        next();
    });
};