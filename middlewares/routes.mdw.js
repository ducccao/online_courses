module.exports = function(app) {
    // routers
    app.use("/", require("./../routers/home.router"));
    app.use(require("./../routers/main.router"));
    // app.use(require("./../routers/test.router"));
    app.use("/admin", require("./../routers/admin.router"));
    app.use("/admin", require("./../routers/course.router"));
    app.use("/user", require("./../routers/user.router"));
    app.use("/watchlist", require("./../routers/watchlist.route"));
    app.use("/account", require("./../routers/account.router"));
    app.use("/cart", require("./../routers/cart.router"));
};