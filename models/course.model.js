const db = require("../utils/db");
const config = require("./../config/default.json");

const TBL_COURSE = "course";
const TBL_CATEGORY = "category";
const TBL_USER = "user";

module.exports = {
  all() {
    const sql = "select * from course";
    return db.load(sql);
  },
  pagiCourse(offset) {
    const sql = `select * from ${TBL_COURSE} limit ${config.pagination.limit} offset ${offset}`;
    return db.load(sql);
  },

  pagiListCourse(offset, limit) {
    const sql = `select * from ${TBL_COURSE} limit ${limit} offset ${offset}`;
    return db.load(sql);
  },

  pagiListCourseByCat(catID, offset, limit) {
    const sql = `select * from ${TBL_COURSE} where catID="${catID}"  limit ${limit}  offset ${offset}`;
    return db.load(sql);
  },

  addCourse(entity) {
    return db.add(entity, TBL_COURSE);
  },

  addDiscount(courseID, discount) {
    const entity = {
      courseID: courseID,
      percent: discount,
    };
    return db.add(entity, config.DATABASE.TABLE.SALE);
  },
  getCourseByName(courseName) {
    const sql = `select * from ${TBL_COURSE} where courseName = "${courseName}"`;
    return db.load(sql);
  },
  getCourseByID(courseID) {
    const sql = `select * from ${TBL_COURSE} where courseID = ${courseID}`;
    return db.load(sql);
  },
  getCourseByCourseName(courseName) {
    const sql = `select * from ${TBL_COURSE} where courseName= "${courseName}"`;
    return db.load(sql);
  },

  editCourse(entity) {
    const condition = {
      courseID: entity.courseID,
    };
    return db.patch(entity, condition, TBL_COURSE);
  },
  delCourse(entity) {
    const condition = {
      courseID: entity.courseID,
    };
    return db.del(condition, TBL_COURSE);
  },

  // get type of course
  getTypeOfCourse(courseID, catID) {
    const sql = `select  subjID from ${TBL_COURSE} as c, ${TBL_CATEGORY} as cat where c.catID = ${catID}
     and c.courseID = ${courseID}
      and ${catID} = cat.catID `;
    return db.load(sql);
  },

  // get instructor
  getInstructor(courseID, userID) {
    const sql = `select userName, decentralization from ${TBL_USER} as u , ${TBL_COURSE} as c 
    where c.courseID  = ${courseID} and c.userID = u.userID and c.userID = ${userID}`;
    return db.load(sql);
  },

  // get rating
  getRatingCourse(courseID) {
    const sql = `select rating from ${config.DATABASE.TABLE.REVIEW} as r, 
    ${config.DATABASE.TABLE.COURSE} as c where c.courseID = r.courseID 
    and c.courseID = ${courseID}`;
    return db.load(sql);
  },
  // get discount
  getDiscountCourse(courseID) {
    const sql = `select percent from ${config.DATABASE.TABLE.SALE} as s, 
    ${config.DATABASE.TABLE.COURSE} as c where c.courseID = s.courseID 
    and c.courseID = ${courseID}
    `;
    return db.load(sql);
  },
};
