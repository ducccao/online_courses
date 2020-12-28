const db = require("./../utils/db");
const config = require("./../config/default.json");

const adminController = require("../controllers/admin.controller");

const TBL_CATEGORY = "category";

module.exports = {
  // get All user
  getAllUser() {
    const sql = `select * from users`;
    return db.load(sql);
  },

  // count course in cate
  async countCoursetInCate(cateID) {
    const sql = `select count(*) as totalCourse from course where catID = ${cateID} `;
    const rows = await db.load(sql);
    return rows[0].totalCourse;
  },

  // get  all category
  async getAllCategory() {
    const sql = `select * from category`;
    const rows = await db.load(sql);

    return rows;
  },

  // pagination categories
  pagiCate(offset) {
    //console.log(offset);
    const sql = `select * from ${TBL_CATEGORY}  limit ${config.pagination.limit} offset ${offset}`;

    return db.load(sql);
  },

  // add cate
  addCate(entity) {
    return db.add(entity, TBL_CATEGORY);
  },

  // get cat by cat name
  getCatByCatName(catName) {
    const sql = `select * from ${TBL_CATEGORY} where catName = "${catName}"`;
    return db.load(sql);
  },

  // get Cate by ID
  getCateByID(catID) {
    return db.getCateByID(catID);
  },

  // edit cate by ID
  editCate(entity) {
    const condition = {
      catID: entity.catID,
    };
    return db.patch(entity, condition, TBL_CATEGORY);
  },
  // delete cate by ID
  delCate(entity) {
    const condition = {
      catID: entity.catID,
    };
    return db.del(condition, TBL_CATEGORY);
  },

  // get cousrse detail
  getCourseDetail(catID) {
    const sql = `select*from course where catID = ${catID}`;
    return db.load(sql);
  },
};
