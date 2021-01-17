const db = require("../utils/db");
const config = require("./../config/default.json");

const TBL_CHAPTER = "chapter";

module.exports = {
    All() {
        const sql = `select * from ${TBL_CHAPTER}`;
        db.load(sql);
    },

    getAllChapterByCourseID(courseID) {
        const sql = `select * from ${TBL_CHAPTER} where courseID = ${courseID}`;
        return db.load(sql);
    },

    getAllChapterWithDurationByCourseID(courseID) {
        const sql = `select sum(duration_hour) as chapterTotalHour, sum(duration_min) as chapterTotalMin, sum(duration_sec) as chapterTotalSec, count(unitId) as unitInChapter, c.*
    from ${config.DATABASE.TABLE.UNIT} u, ${TBL_CHAPTER} c
    where u.chapterID = c.chapterID and c.courseId = ${courseID}
    group by u.chapterID
    order by c.chapterID`;
        return db.load(sql);
    },

    getChapterMaxId() {
        const sql = `SELECT count(*) as chapterMaxID FROM ${TBL_CHAPTER}`;
        return db.load(sql);
    },

    getChapterById(chapterID) {
        const sql = `SELECT * FROM ${TBL_CHAPTER} where chapterID = ${chapterID}`;
        return db.load(sql);
    },

    addChapter(entity) {
        return db.add(entity, TBL_CHAPTER);
    },

    getChapterOfCourseByChapterName(courseID, chapterName) {
        const sql = `select * from ${TBL_CHAPTER} where courseID = ${courseID} and chapterName = "${chapterName}"`;
        return db.load(sql);
    },
};