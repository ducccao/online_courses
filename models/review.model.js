const db = require("../utils/db");
const config = require("./../config/default.json");

module.exports = {
    getReview: (courseID) => {
        const sql = `select u.userName as userName, r.rating*20 as rating, r.content as content
        from review r  join ${config.DATABASE.TABLE.USER} u 
        on r.userID = u.userID
        where r.courseID = ${courseID}`;
        return db.load(sql);
    },
};