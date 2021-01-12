const db = require("../utils/db");
const config = require("./../config/default.json");

const TBL_CHAPTER = "chapter";

module.exports = {
  getAllChapterByCourseID(courseID) {
    const sql = `select * from ${TBL_CHAPTER} where courseID = ${courseID}`;
    return db.load(sql);
  },

  getAllChapterWithDurationByCourseID(courseID) {
    const sql = `select sum(duration_hour) as chapterTotalHour, sum(duration_min) as chapterTotalMin, sum(duration_sec) as chapterTotalSec, count(unitId) as unitInChapter, c.*
    from ${config.DATABASE.TABLE.UNIT} u, ${config.DATABASE.TABLE.CHAPTER} c
    where u.chapterID = c.chapterID and c.courseId = ${courseID}
    group by u.chapterID`;
    return db.load(sql);
  },
}