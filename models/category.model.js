const db = require("../utils/db");

const TBL_CATEGORIES = "categories";

module.exports = {
  all() {
    const sql = `select * from ${TBL_CATEGORIES}`;
    return db.load(sql);
  },

  add(entity) {
    return db.add(entity, TBL_CATEGORIES);
  },
};
