const expressSession = require("express-session");
var session = require("express-session");
const config = require("./../config/default.json");
// express session

module.exports = function (app) {
  var MySQLStore = require("express-mysql-session")(session);

  var options = {
    host: "remotemysql.com",
    port: "3306",
    user: `wqzZCi0KgY`,
    password: `TF8CnEFLu4`,
    database: `wqzZCi0KgY`,
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
