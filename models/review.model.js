const db = require("../utils/db");

module.exports = {
    getReview: (courseID) => {
        const sql = `select u.userName as userName, r.rating*20 as rating, r.content as content
        from review r  join users u 
        on r.userID = u.userID
        where r.courseID = ${courseID}`;
        return db.load(sql);
    }

}