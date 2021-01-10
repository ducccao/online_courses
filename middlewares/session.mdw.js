const expressSession = require("express-session");
var session = require("express-session");
const config = require("./../config/default.json");

// express session

const COMMON_HOST = "localhost";
const COMMON_PORT = 3306;
const COMMON_USER = config.DATABASE.USERS.COMMON.USER;
const COMMON_PASSWORD = config.DATABASE.USERS.COMMON.PASSWORD;
const COMMON_DB_NAME = config.DATABASE.NAME;

module.exports = function(app) {
    var MySQLStore = require("express-mysql-session")(session);

    var options = {
        host: "sql9.freemysqlhosting.net",
        port: 3306,
        user: `sql9386070`,
        password: `bxM9yUkHRK`,
        database: `sql9386070`,

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

    var options_dev = {
        host: COMMON_HOST,
        port: COMMON_PORT,
        user: COMMON_USER,
        password: COMMON_PASSWORD,
        database: COMMON_DB_NAME,

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