const db = require("../utils/db");
const config = require("./../config/default.json");

const TBL_COURSE = "course";

module.exports = {
  all() {
    const sql = "select * from course";
    return db.load(sql);
  },
  pagiCourse(offset) {
    const sql = `select * from ${TBL_COURSE} limit ${config.pagination.limit} offset ${offset}`;
    return db.load(sql);
  },
  addCourse(entity) {
    return db.add(entity, TBL_COURSE);
  },
  getCourseByName(courseName) {
    const sql = `select * from ${TBL_COURSE} where courseName = ${courseName}`;
    return db.load(sql);
  },
  getCourseByID(courseID) {
    const sql = `select * from ${TBL_COURSE} where courseID = ${courseID}`;
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
};
