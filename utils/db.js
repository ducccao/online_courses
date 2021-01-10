const mysql = require("mysql");
const util = require("util");
const config = require("./../config/default.json");

const COMMON_HOST = "localhost";
const COMMON_PORT = 3306;
const COMMON_USER = config.DATABASE.USERS.COMMON.USER;
const COMMON_PASSWORD = config.DATABASE.USERS.COMMON.PASSWORD;
const COMMON_DB_NAME = config.DATABASE.NAME;

const pool = mysql.createPool({
    host: "sql9.freemysqlhosting.net",
    port: "3306",
    user: `sql9386070`,
    password: `bxM9yUkHRK`,
    database: `sql9386070`,
    connectionLimit: 50,
});

// promisify bind pool to a promise and remove callback
const poo_query = util.promisify(pool.query).bind(pool);
module.exports = {
    load: (sql) => {
        return poo_query(sql);
    },
    add: (entity, tableName) => {
        return poo_query(`insert into ${tableName} set ? `, entity);
    },

    patch: (entity, condition, tblName) => {
        return poo_query(`update ${tblName} set ? where ?`, [entity, condition]);
    },
    del: (condition, tblName) => {
        const sql = `delete from ${tblName} where ?`;
        return poo_query(sql, condition);
    },
    getCateByID: (catID) => {
        const sql = `select * from category where catID = ${catID}`;
        return poo_query(sql);
    },
};