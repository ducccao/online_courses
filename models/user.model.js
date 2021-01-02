const db = require("./../utils/db");

const TBL_USER = "user";

module.exports = {
  // get all user
  getAllUser() {
    const sql = `select * from user`;
    return db.load(sql);
  },
  // find user by email and passwod
  findUserByInfor(email, password) {
    const sql = `select * from user where email = "${email}" and password = "${password}" `;
    console.log(sql);
    // const sql = `select * from user where email = "admin1@gmail.com" and password = "admin"`;
    return db.load(sql);
  },

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

  // add user
  addUser(user) {
    return db.add(user, TBL_USER);
  },

  // get user by ID
  getUserByID(userID) {
    const sql = `select* from user where userID = ${userID}`;
    return db.load(sql);
  },

  // find user by otp
  getUserByOTP(OTP_URL) {
    const sql = `select * from ${TBL_USER} where OTP_URL = "${OTP_URL}"`;
    return db.load(sql);
  },

  // update verify user
  updateVerifyUser(entity, condition) {
    return db.patch(entity, condition, TBL_USER);
  },
};
