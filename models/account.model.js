const db = require("../utils/db");

const TBL_USER = "user";

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
    }
}