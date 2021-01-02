const { get } = require("./main.router");
const { auth, authNav, authOTP } = require("./../middlewares/auth.mdw");


const express = require("express");
const router = express.Router();
const watchlistController = require("../controllers/watchlist.controller")

router.get('/', authNav, watchlistController.getListCourses);

router.get(
    "/byCat/:id",
    authNav,
    watchlistController.getCourseListByCat
);


module.exports = router;