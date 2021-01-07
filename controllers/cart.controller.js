const moment = require("moment");
const cartModel = require("./../models/cart.model");
const courseModel = require("./../models/course.model");
const orderModel = require("./../models/order.model");
const orderDetailModel = require("./../models/order-detail.model");

const cartController = {
    // get cart page
    getCartPage: async(req, res) => {
        const items = [];
        //  console.log(req.session.cart);

        if (!req.session.cart) {
            return res.render("vwCart/Cart", {
                layout: "main",
            });
        }

        for (const ci of req.session.cart) {
            const course = await courseModel.getCourseByID(ci.id);
            const discount = await courseModel.getDiscountCourse(ci.id);
            //  console.log(course);
            items.push({
                ...ci,
                ...course[0],
                ...discount[0],
                amount: +ci.quantity * course[0].fee,
            });
        }

        //   console.log(items);

        const total = items.reduce((pre, curr) => {
            //     console.log("pre : ", pre);
            //    console.log(" curr", curr);
            if (curr.percent) {
                return pre + curr.fee - (curr.fee * curr.percent) / 100;
            } else {
                return pre + curr.fee;
            }
        }, 0);

        //  console.log(items[0].course);
        //  console.log(total);
        //  console.log(items);

        res.render("vwCart/Cart", {
            layout: "main",
            items: items,
            empty: items.length === 0,
            total: total,
        });
    },
    // add course to cart
    addCourseIntoCart: (req, res) => {
        console.log("Add course into cart!");

        //   console.log(req.body);
        //   console.log("Session cart ", req.session.cart);
        const item = {
            id: +req.body.id,
            quantity: +req.body.quantity,
        };
        cartModel.addCart(req.session.cart, item);
        res.redirect(req.headers.referer);
    },

    // remove course in cart
    removeCourseInCart: (req, res) => {
        console.log("Remove item in cart!");
        console.log(req.body);
        console.log(req.session.cart);
        cartModel.delCart(req.session.cart, +req.body.id);
        res.redirect(req.headers.referer);
    },
    // post checkout
    postCheckout: async(req, res) => {
        console.log("Checkout cart!");

        // orders
        const items = [];
        const details = [];

        for (const ci of req.session.cart) {
            const course = await courseModel.getCourseByID(ci.id);
            const discount = await courseModel.getDiscountCourse(ci.id);
            //  console.log(course);
            items.push({
                ...ci,
                ...course[0],
                ...discount[0],
                amount: +ci.quantity * course[0].fee,
            });

            details.push({
                courseID: ci.id,
                quantity: 1,
                price: course[0].fee,
                amount: +ci.quantity * course[0].fee,
            });
        }

        //   console.log(items);

        const total = items.reduce((pre, curr) => {
            //     console.log("pre : ", pre);
            //    console.log(" curr", curr);
            if (curr.percent) {
                return pre + curr.fee - (curr.fee * curr.percent) / 100;
            } else {
                return pre + curr.fee;
            }
        }, 0);

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