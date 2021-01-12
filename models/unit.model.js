const db = require("../utils/db");
const config = require("./../config/default.json");

const TBL_UNIT = "unit";

module.exports = {
  getAllUnitByChapterID(chapterID) {
    const sql = `select * from ${TBL_UNIT} where chapterID = ${chapterID}`;
    return db.load(sql);
  },
}