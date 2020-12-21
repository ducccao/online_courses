module.exports = function (app) {
  // routers
  app.use(require("./../routers/main.router"));
  app.use("/admin", require("./../routers/admin.router"));
  app.use("/user", require("./../routers/user.router"));

  // app.use(express.static("client"));

  // main router
  app.get("/", (req, res) => {
    console.log(req.session.isAuth);
    console.log(req.session.authUser);

    res.render("vwMain/Home");
  });

  app.get("/about", (req, res) => {
    res.render("vwMain/About");
  });
};
