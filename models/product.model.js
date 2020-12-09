const db = require("./../utils/db");
const config = require("./../config/default.json");

module.exports = {
    all() {
        const sql = "select * from products";
        return db.load(sql);
    },
    byCate(cateID) {
        const sql = `select * from products where cateID = ${cateID}`;
        return db.load(sql);
    },
    async countByCate(cateID) {
        const sql = `select count(*) as total  from products where cateID = ${cateID}`;
        const rows = await db.load(sql);
        //console.log(rows);

        return rows[0].total;
    },
    pageByCate(cateID, offset) {
        const sql = `select * from products where cateID = ${cateID} limit ${config.pagination.limit} offset ${offset} `;
        return db.load(sql);
    },
};