const express = require("express");
const moment = require("moment");
const cartController = require("./../controllers/cart.controller");

const router = express.Router();

router.get("/", cartController.getCartPage);
router.post("/add", cartController.addCourseIntoCart);
router.post("/remove", cartController.removeCourseInCart);
router.post("/checkout", cartController.postCheckout);

module.exports = router;