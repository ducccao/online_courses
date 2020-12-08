const db = require("./../utils/db");

module.exports = {
  all() {
    const sql = "select * from products";
    return db.load(sql);
  },
  byCate(cateID) {
    const sql = `select * from products where cateID = ${cateID}`;
    return db.load(sql);
  },
};
