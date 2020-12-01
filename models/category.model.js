const db = require("../utils/db");

module.exports = {
  all() {
    const sql = "select * from categories";
    return db.load(sql);
  },
};
