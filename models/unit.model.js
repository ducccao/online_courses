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
    where u.chapterID = c.chapterID and c.courseID = ${courseID} and u.flagReviewable = 1
    order by u.unitID
    limit 1`;
    return db.load(sql);
  }
}