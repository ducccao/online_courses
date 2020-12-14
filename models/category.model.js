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

  allWithDetails() {
    const sql = `
    select c.*, count(p.productID) as ProductCount
    from categories c left join products p on c.cateID = p.productID
    group by c.cateID, c.cateName
  `;
    return db.load(sql);
  },
};
