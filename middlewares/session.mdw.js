const expressSession = require("express-session");

// express session

module.exports = function (app) {
  app.set("trust proxy", 1); // trust first proxy
  app.use(
    expressSession({
      secret: "SECRET_KEY",
      resave: false,
      saveUninitialized: true,
      cookie: {
        //secure: true
      },
    })
  );
};
