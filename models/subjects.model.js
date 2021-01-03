const db = require("../utils/db");

const TBL_SUBJECTS = "subjects";

module.exports = {
  all() {
    const sql = `select * from ${TBL_SUBJECTS}`;
    return db.load(sql);
  },
}