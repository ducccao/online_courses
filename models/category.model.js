const db = require("../utils/db");

const TBL_CATEGORIES = "categories";
const TBL_CATEGORIES_REAL = "category";

module.exports = {
  all() {
    const sql = `select * from ${TBL_CATEGORIES}`;
    return db.load(sql);
  },

  allCate() {
    const sql = `select * from ${TBL_CATEGORIES_REAL}`;
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
    from categories c left join course p on c.cateID = p.catID	
    group by c.cateID, c.cateName
  `;
    return db.load(sql);
  },
};
