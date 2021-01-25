const mysql = require("mysql");
const util = require("util");
const config = require("./../config/default.json");

const pool = mysql.createPool({
  host: "localhost",
  port: "3306",
  user: `${config.DATABASE.USERS.COMMON.USER}`,
  password: `${config.DATABASE.USERS.COMMON.PASSWORD}`,
  database: `${config.DATABASE.NAME}`,
  connectionLimit: 50,
});

const pool_deploy = mysql.createPool({
  host: "localhost",
  port: "3306",
  user: `wqzZCi0KgY`,
  password: `TF8CnEFLu4`,
  database: `wqzZCi0KgY`,
  connectionLimit: 50,
});

// promisify bind pool to a promise and remove callback
const poo_query = util.promisify(pool_deploy.query).bind(pool_deploy);

//const poo_query_deploy = util.promisify(pool.query).bind(pool);

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
