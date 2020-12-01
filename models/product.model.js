const db = require("./../utils/db");

module.exports = {
  all() {
    const sql = "select * from products";
    return db.load(sql);
  },
};
