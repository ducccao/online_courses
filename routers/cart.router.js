const express = require("express");
const cartController = require("./../controllers/cart.controller");
const {
    authNav,
    authOTP,
    auth,
    authAdmin,
} = require("./../middlewares/auth.mdw");

const router = express.Router();

router.get("/", auth, cartController.getCartPage);
router.post("/add", cartController.addCourseIntoCart);
router.post("/remove", cartController.removeCourseInCart);
router.post("/checkout", cartController.postCheckout);

module.exports = router;