const db = require("../utils/db");

const TBL_CATEGORIES = "category";

module.exports = {
  all() {
    const sql = `select * from ${TBL_CATEGORIES}`;
    return db.load(sql);
  },

  add(entity) {
    return db.add(entity, TBL_CATEGORIES);
  },

  allWithDetails() {
    const sql = `
    select c.*, count(p.courseID) as CourseCount
    from category c left join course p on c.catID = p.courseID
    group by c.catID, c.catName
  `;
    return db.load(sql);
  },
};
