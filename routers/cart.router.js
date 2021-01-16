const express = require("express");
const cartController = require("./../controllers/cart.controller");
const {
    authNav,
    authOTP,
    auth,
    authAdmin,
} = require("./../middlewares/auth.mdw");

const router = express.Router();

router.get("/", auth, authNav, authOTP, cartController.getCartPage);
router.post("/add", auth, authOTP, cartController.addCourseIntoCart);
router.post("/remove", auth, authOTP, cartController.removeCourseInCart);
router.post("/checkout", auth, authOTP, cartController.postCheckout);

module.exports = router;