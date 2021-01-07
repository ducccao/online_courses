module.exports = function(app) {
    app.use(async function(req, res, next) {
        //   console.log(req.session.cart);
        if (typeof req.session.cart !== "undefined") {
            res.locals.lcCartQuantity = req.session.cart.length;
        } else {
            res.locals.lcCartQuantity = 0;
        }
        next();
    });
};