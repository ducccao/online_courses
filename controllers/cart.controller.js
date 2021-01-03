const moment = require("moment");
const cartModel = require("./../models/cart.model");
const courseModel = require("./../models/course.model");
const orderModel = require("./../models/order.model");
const orderDetailModel = require("./../models/order-detail.model");

const cartController = {
    // get cart page
    getCartPage: async(req, res) => {
        const items = [];
        console.log(req.session.cart);

        if (!req.session.cart) {
            return res.render("vwCart/Cart", {
                layout: "main",
            });
        }

        for (const ci of req.session.cart) {
            const course = await courseModel.getCourseByID(ci.id);
            items.push({
                ...ci,
                course,
                amount: ci.quantity * course.fee,
            });
        }

        res.render("vwCart/Cart", {
            layout: "main",
            items,
            empty: req.session.cart.length === 0,
        });
    },
    // add course to cart
    addCourseIntoCart: (req, res) => {
        const item = {
            id: +req.body.id,
            quantity: +req.body.quantity,
        };
        cartModel.addCart(req.session.cart, item);
        res.redirect(req.headers.referer);
    },

    // remove course in cart
    removeCourseInCart: (req, res) => {
        cartModel.delCart(req.session.cart, +req.body.id);
        res.redirect(req.headers.referer);
    },
    // post checkout
    postCheckout: async(req, res) => {
        const details = [];
        let total = 0;
        for (const ci of req.session.cart) {
            const course = await courseModel.getCourseByID(ci.id);
            const amount = ci.quantity * course[0].price;
            total += amount;
            details.push({
                courseID: course[0].courseID,
                quantity: ci.quantity,
                price: course[0].fee,
                amount: amount,
            });
        }
        const order = {
            orderDate: moment().format("YYYY-MM-DD HH:mm:ss"),
            userID: req.session.authUser.userID,
            total: total,
        };
        await orderModel.add(order);

        for (const detail of details) {
            detail.orderID = order.orderID;
            await orderDetailModel.add(detail);
        }

        req.session.cart = [];
        res.redirect(req.headers.referer);
    },
};

module.exports = cartController;