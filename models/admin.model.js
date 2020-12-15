const db = require("./../utils/db");
const config = require("./../config/default.json");

module.exports = {
  // get All user
  getAllUser() {
    const sql = `select * from users`;
    return db.load(sql);
  },

  // count cate
  async countProductInCate(cateID) {
    const sql = `select count(*) as totalProduct from products where cateID = ${cateID} `;
    const rows = await db.load(sql);
    return rows[0].totalProduct;
  },

  // pagination categories
  pagiCate(cateID, offset) {
    const sql = `select * from products where cateID = ${cateID} limit ${config.pagination.limit} offset ${offset}`;

    return db.load(sql);
  },
};
