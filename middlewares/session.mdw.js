const expressSession = require("express-session");
var session = require("express-session");
// express session

module.exports = function (app) {
  var MySQLStore = require("express-mysql-session")(session);

  var options = {
    host: "localhost",
    port: 3306,
    user: "duccao",
    password: "duc123",
    database: "onlinecourses",

    charset: "utf8",
    schema: {
      tableName: "sessions",
      columnNames: {
        session_id: "session_id",
        expires: "expires",
        data: "data",
      },
    },
  };

  var sessionStore = new MySQLStore(options);

  app.set("trust proxy", 1); // trust first proxy
  app.use(
    expressSession({
      secret: "SECRET_KEY",
      resave: false,
      saveUninitialized: true,
      store: sessionStore,
      cookie: {
        //secure: true
      },
    })
  );
};
