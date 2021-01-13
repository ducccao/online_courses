const db = require("../utils/db");
const config = require("./../config/default.json");

const TBL_USER = "users";

module.exports = {
    // find user by email
    findUserByEmail(email) {
        const sql = `select * from ${TBL_USER} where email= "${email}" `;
        return db.load(sql);
    },

    // check available
    isAvailable(email) {
        const sql = `select * from ${TBL_USER} where email = "${email}"`;
        return db.load(sql);
    },

    // update profile
    updateProfile(entity, condition) {
        console.log("vo update profile");
        return db.patch(entity, condition, TBL_USER);
    },
    updatePassword(entity, condition) {
        console.log("vo update password");
        return db.patch(entity, condition, TBL_USER);
    },

    getPurchasedCourses(userID) {
        const sql = `select * from ${config.DATABASE.TABLE.ORDERS} as od ,
        ${config.DATABASE.TABLE.ORDERDETAILS} as dt where ${userID} = od.userID and od.orderID = dt.orderID
        `;
        return db.load(sql);
    },

    getInstructorCourse(isntructorID) {
        const sql = `select * from ${config.DATABASE.TABLE.COURSE} as c
        where ${isntructorID} = c.userID`;
        return db.load(sql);
    }
};