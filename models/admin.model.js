const db = require("./../utils/db");

module.exports = {
  getAllUser() {
    const sql = `select * from users`;
    return db.load(sql);
  },
};
