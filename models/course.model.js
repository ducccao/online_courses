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

  increaseView(entity) {
    const condition = {
      courseID: entity.courseID,
    };
    return db.patch(entity, condition, TBL_COURSE);
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
    const sql = `select subjID from ${TBL_COURSE} as c, ${TBL_CATEGORY} as cat
    where c.catID = ${catID} and c.courseID = ${courseID} and ${catID} = cat.catID `;
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

    // get catName
  getCatName(courseID) {
    const sql = `select ca.catName
    from ${config.DATABASE.TABLE.CATEGORY} ca, ${config.DATABASE.TABLE.COURSE} c
    where ca.catID = c.catID and c.courseID = ${courseID}`;
    return db.load(sql);
  },

  getMostBuyWeek() {
    const sql = `SELECT count(cb.courseID), c.*
    FROM ${config.DATABASE.TABLE.COURSE} c, ${config.DATABASE.TABLE.COURSE_BOUGHT} cb
    where c.courseID = cb.courseID and DATEDIFF(CURDATE(),cb.dayBought) < 7
    group by cb.courseID
    order by count(cb.courseID) desc
    limit 4;`;
    return db.load(sql);
  },

  getReviewCourseNumb(courseID) {
    const sql = `select count(*) from ${config.DATABASE.TABLE.REVIEW} where courseID = ${courseID}`;
    return db.load(sql);
  },

  getCourseBoughtNumb(courseID) {
    const sql = `select count(*) from ${config.DATABASE.TABLE.COURSE_BOUGHT} where courseID = ${courseID}`;
    return db.load(sql);
  },

  getCourseChapters(courseID) {
    const sql = `select * from ${config.DATABASE.TABLE.CHAPTER} where courseID = ${courseID}`;
    return db.load(sql);
  },

  getCourseUnits(courseID) {
    const sql = `select distinct u.* from ${config.DATABASE.TABLE.CHAPTER} as c, ${config.DATABASE.TABLE.UNIT} as u
    where c.courseID = ${courseID}`;
    return db.load(sql);
  },

  getAveRatingCourse(courseID) {
    const sql = `select round(sum(rating)/count(*),2) from ${config.DATABASE.TABLE.REVIEW} as r, 
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

  getAllDiscountCourse() {
    const sql = `select * from ${config.DATABASE.TABLE.SALE} as s, 
    ${config.DATABASE.TABLE.COURSE} as c, ${config.DATABASE.TABLE.USER} as u where c.courseID = s.courseID and u.userID = c.userID`;
    return db.load(sql);
  }
};
