const db = require("../utils/db");

const TBL_CATEGORIES = "categories";

module.exports = {
  // find all categories
  all() {
    const sql = `select * from ${TBL_CATEGORIES}`;
    return db.load(sql);
  },
  //  find cate by id
  async single(id) {
    const sql = `select * from ${TBL_CATEGORIES} where  cateID =  ${id} `;
    const rows = await db.load(sql);

    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  },

  //  add new cate
  add(entity) {
    return db.add(entity, TBL_CATEGORIES);
  },

  // del cate by id
  del(entity) {
    const condition = {
      cateID: entity.cateID,
    };
    return db.del(condition, TBL_CATEGORIES);
  },

  // edit cate by id
  patch(entity) {
    const condition = {
      cateID: entity.cateID,
    };

    delete entity.cateID;

    return db.patch(entity, condition, TBL_CATEGORIES);
  },

  // detail
  allWithDetails() {
    const sql = `
    select c.* , count(p.productID) as ProductCount from categories c left join products p
    on c.cateID = p.cateID group by c.cateID, c.cateName `;

    return db.load(sql);
  },
};
