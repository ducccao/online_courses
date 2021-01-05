const db = require("../utils/db");

const TBL_CATEGORIES = "category";

module.exports = {
  all() {
    const sql = `select * from ${TBL_CATEGORIES}`;
    return db.load(sql);
  },

  allCate() {
    const sql = `select * from ${TBL_CATEGORIES}`;
    return db.load(sql);
  },

  add(entity) {
    return db.add(entity, TBL_CATEGORIES);
  },

  getCateByID(catID) {
    const sql = `select * from ${TBL_CATEGORIES} where catID = ${catID} `;
    return db.load(sql);
  },

  allWithDetails() {
    const sql = `
    select c.*, count(p.courseID) as CourseCount
    from ${TBL_CATEGORIES} c left join course p on c.catID = p.catID	
    group by c.catID, c.catName
  `;
    return db.load(sql);
  },
};
