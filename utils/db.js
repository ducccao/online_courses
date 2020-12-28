const mysql = require("mysql");
const { off } = require("process");
const util = require("util");

var pool = mysql.createPool({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "long123",
    database: "onlinecourses",
    connectionLimit: 50,
});

// promisify bind pool to a promise and remove callback
const poo_query = util.promisify(pool.query).bind(pool);

module.exports = {
<<<<<<< HEAD
    load: (sql) => {
        return poo_query(sql);
    },
    add: (entity, tableName) => {
        return poo_query(`insert into ${tableName} set ? `, entity);
    },
    insertStuffIntoTable: (entity, tblName) => {
        return poo_query(`insert into ${tblName} set ? `, entity);
    },
    patch: (entity, condition, tblName) => {
        console.log("ham patch ne");
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
=======
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
>>>>>>> phase2/server
