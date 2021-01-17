const db = require("../utils/db");
const config = require("./../config/default.json");

const TBL_UNIT = "unit";

module.exports = {
    getAllUnitByChapterID(chapterID) {
        const sql = `select * from ${TBL_UNIT} where chapterID = ${chapterID}
    order by unitID`;
        return db.load(sql);
    },

    getFirstPreviewVideoOfCourse(courseID) {
        const sql = `select u.linkVideo
    from ${TBL_UNIT} u, ${config.DATABASE.TABLE.CHAPTER} c
    where u.chapterID = c.chapterID and c.courseID = ${courseID} 
    order by u.unitID
    limit 1`;
        return db.load(sql);
    },

    getFirstVideoOfCourse(courseID) {
        const sql = `select u.linkVideo
    from ${TBL_UNIT} u, ${config.DATABASE.TABLE.CHAPTER} c
    where u.chapterID = c.chapterID and c.courseID = ${courseID}
    order by u.unitID
    limit 1`;
        return db.load(sql);
    },

    getUnitMaxId() {
        const sql = `SELECT count(*) as unitMaxID FROM ${TBL_UNIT}`;
        return db.load(sql);
    },

    addUnit(entity) {
        return db.add(entity, TBL_UNIT);
    },

    getUnitOfchapterByUnitName(chapterID, unitName) {
        const sql = `select * from ${TBL_UNIT} where chapterID = ${chapterID} and unitContent = "${unitName}"`;
        return db.load(sql);
    },
}