<<<<<<< HEAD
module.exports = function(app) {
    // routers
    app.use(require("./../routers/main.router"));
    app.use("/admin", require("./../routers/admin.router"));
    app.use("/user", require("./../routers/user.router"));
    app.use("/account", require("./../routers/account.router"));
=======
module.exports = function (app) {
  // routers
  app.use(require("./../routers/main.router"));
  app.use("/admin", require("./../routers/admin.router"));
  app.use("/admin", require("./../routers/course.router"));
  app.use("/user", require("./../routers/user.router"));
>>>>>>> phase2/server

    // app.use(express.static("client"));

<<<<<<< HEAD
    // main router
    app.get("/", (req, res) => {
        console.log(req.session.isAuth);
        console.log(req.session.authUser);
=======
  // main router
  app.get("/", (req, res) => {
    // console.log(req.session.isAuth);
    // console.log(req.session.authUser);
>>>>>>> phase2/server

        res.render("vwMain/Home");
    });

    app.get("/about", (req, res) => {
        res.render("vwMain/About");
    });
};