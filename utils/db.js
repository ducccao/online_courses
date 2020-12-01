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
const poo_query = util.promisify(pool.query).bind(pool);

module.exports = {
  load: (sql) => {
    return poo_query(sql);
  },
  add: (entity, tableName) => {
    return poo_query(`insert into ${tableName} set ? `, entity);
  },
};
