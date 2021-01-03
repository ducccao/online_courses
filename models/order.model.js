const db = require("../utils/db");

const TBL_ORDERS = "orders";
module.exports = {
    add: async(entity) => {
        const ret = await db.add(entity, TBL_ORDERS);
        entity.orderID = ret.insertId;
    },
};