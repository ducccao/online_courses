const db = require("../utils/db");

module.exports = {
  all() {
    const sql = "select * from course";
    return db.load(sql);
  },
};
