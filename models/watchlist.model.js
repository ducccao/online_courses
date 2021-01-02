const db = require("../utils/db");

const TBL_CATEGORIES = "category";
const TBL_WATCHLIST = "watchlist";

module.exports = {
    allCat() {
        const sql = `select * from ${TBL_CATEGORIES}`;
        return db.load(sql);
    },

    getCateByID(catID) {
        const sql = `select * from ${TBL_CATEGORIES} where catID = ${catID} `;
        return db.load(sql);
    },

    allCatWithDetails(userID) {
        const sql = `
        select c.*, count(watch.courseID) as CourseCount
        from category  c left join  
            (select course.catID as catID, course.courseID as courseID
                from watchlist as w join course   on course.courseID = w.courseID  
                where   w.userID = ${userID} ) as watch
        on watch.catID = c.catID
        group by c.catID, c.catName
  `;
        return db.load(sql);
    },


    allCourse(userID) {
        const sql = `select c.* from course c join watchlist w on w.courseID = c.courseID where w.userID = ${userID}`;
        return db.load(sql);
    },
    pagiCourse(offset, userID) {
        const sql = `select c.* from course c join watchlist w on w.courseID = c.courseID where w.userID = ${userID} limit ${config.pagination.limit} offset ${offset}`;
        return db.load(sql);
    },

    pagiListCourse(offset, limit, userID) {
        const sql = `select * from course c join watchlist w on w.courseID = c.courseID where w.userID = ${userID} limit ${limit} offset ${offset}`;
        return db.load(sql);
    },

    pagiListCourseByCat(catID, offset, limit, userID) {
        const sql = `select c.* from course c join watchlist w on w.courseID = c.courseID where w.userID = ${userID} and catID="${catID}"  limit ${limit}  offset ${offset}`;
        return db.load(sql);
    },

    /*    addCourse(entity) {
            return db.add(entity, TBL_COURSE);
        },
    */
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


    addWatchlistCourse(entity) {
        return db.add(entity, TBL_WATCHLIST);
    },

    delWatchlistCourse(entity) {
        const condition = {
            courseID: entity.courseID,
            userID: entity.userID,
        };
        return db.del(condition, TBL_WATCHLIST);
    },


};