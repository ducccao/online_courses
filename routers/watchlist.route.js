const { get } = require("./main.router");

const express = require("express");
const router = express.Router();
const watchlistController = require("../controllers/watchlist.controller")

router.get('/', watchlistController.getListCourses);


module.exports = router;