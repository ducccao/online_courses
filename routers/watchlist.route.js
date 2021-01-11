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

router.post(
    "/search",
    watchlistController.searchCourse
);
router.get(
    "/search",
    watchlistController.searchCourse
);

router.post(
    "/method",
    watchlistController.editWatchlist
);

module.exports = router;