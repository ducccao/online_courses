const { table } = require("console");
const mysql = require("mysql");
const util = require("util");

var pool = mysql.createPool({
  host: "localhost",
  port: "3306",
  user: "duccao",
  password: "duc123",
  database: "qlbh",
  connectionLimit: 50,
});

// promisify bind pool to a promise and remove callback
const pool_query = util.promisify(pool.query).bind(pool);

module.exports = {
  load: (sql) => {
    return pool_query(sql);
  },

  add: (entity, tableName) => {
    return pool_query(`insert into ${tableName} set ? `, entity);
  },

  del: (condition, tableName) => {
    return pool_query(`delete from ${tableName} where ?`, condition);
  },

  patch: (entity, condition, tableName) => {
    return pool_query(`update ${tableName} set ? where ?`, [entity, condition]);
  },
};
