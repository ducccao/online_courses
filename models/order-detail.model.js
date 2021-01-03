const db = require("./../utils/db");

const TBL_ORDERDETAIL = "orderdetails";

module.exports = {
    add(entity) {
        return db.add(entity, TBL_ORDERDETAIL);
    },
};