const mysql = require("mysql");
const util = require("util");
const config = require("./../config/default.json");

const pool = mysql.createPool({

    host: "localhost",
    port: "3306",
    user: `${config.DATABASE.USERS.LONG.USER}`,
    password: `${config.DATABASE.USERS.LONG.PASSWORD}`,
    database: `${config.DATABASE.NAME}`,
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