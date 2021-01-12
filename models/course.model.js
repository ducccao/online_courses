const db = require("../utils/db");
const config = require("./../config/default.json");

const TBL_COURSE = "course";
const TBL_CATEGORY = "category";
const TBL_USER = "users";

module.exports = {
    all() {
        const sql = `select * from  ${TBL_COURSE}`;
        return db.load(sql);
    },
    pagiCourse(offset) {
        const sql = `select * from ${TBL_COURSE} limit ${config.pagination.limit} offset ${offset}`;
        return db.load(sql);
    },

    pagiListCourse(offset, limit) {
        const sql = `select * from ${TBL_COURSE} limit ${limit} offset ${offset}`;
        return db.load(sql);
    },
    addCourse(entity) {
        return db.add(entity, TBL_COURSE);
    },
    getCourseByName(courseName) {
        const sql = `select * from ${TBL_COURSE} where courseName = "${courseName}"`;
        return db.load(sql);
    },
    getCourseByID(courseID) {
        const sql = `select * from ${TBL_COURSE} where courseID = ${courseID}`;
        return db.load(sql);
    },
    getCourseByCourseName(courseName) {
        const sql = `select * from ${TBL_COURSE} where courseName= "${courseName}"`;
        return db.load(sql);
    },

    increaseView(entity) {
        const condition = {
            courseID: entity.courseID,
        };
        return db.patch(entity, condition, TBL_COURSE);
    },

    editCourse(entity) {
        const condition = {
            courseID: entity.courseID,
        };
        return db.patch(entity, condition, TBL_COURSE);
    },
    delCourse(entity) {
        const condition = {
            courseID: entity.courseID,
        };
        return db.del(condition, TBL_COURSE);
    },

    pagiListCoursePrice(offset, limit) {
        const sql = `select * from ${TBL_COURSE} order by fee limit ${limit} offset ${offset}`;
        return db.load(sql);
    },
    pagiListCourseStart(offset, limit) {
        const sql = `select cs.* from ${TBL_COURSE} cs left join review r on cs.courseID = r.courseID
        group by cs.courseID
        order by avg(r.rating) desc
        limit ${limit} offset ${offset}`;
        return db.load(sql);
    },

    pagiListCourseByCat(catID, offset, limit) {
        const sql = `select * from ${TBL_COURSE} where catID="${catID}"  limit ${limit}  offset ${offset}`;
        return db.load(sql);
    },
    pagiListCourseByCatPrice(catID, offset, limit) {
        const sql = `select * from ${TBL_COURSE} where catID ="${catID}" order by fee limit ${limit} offset ${offset}`;

        return db.load(sql);
    },
    pagiListCourseByCatStar(catID, offset, limit) {
        const sql = `select cs.* from ${TBL_COURSE} cs left join review r on cs.courseID = r.courseID
        where cs.catID ="${catID}"
        group by cs.courseID
        order by avg(r.rating) desc
        limit ${limit} offset ${offset}`;
        return db.load(sql);
    },
    addDiscount(courseID, discount) {
        const entity = {
            courseID: courseID,
            percent: discount,
        };
        return db.add(entity, config.DATABASE.TABLE.SALE);
    },
    // get type of course
    getTypeOfCourse(courseID, catID) {
        const sql = `select subjID from ${TBL_COURSE} as c, ${TBL_CATEGORY} as cat
    where c.catID = ${catID} and c.courseID = ${courseID} and ${catID} = cat.catID `;
        return db.load(sql);
    },

    // get instructor
    getInstructor(courseID, userID) {
        const sql = `select userName, decentralization from ${config.DATABASE.TABLE.USER} as u , ${TBL_COURSE} as c 
    where c.courseID  = ${courseID} and c.userID = u.userID and c.userID = ${userID}`;
        return db.load(sql);
    },

    // get rating
    getRatingCourse(courseID) {
        const sql = `select rating from ${config.DATABASE.TABLE.REVIEW} as r, 
    ${config.DATABASE.TABLE.COURSE} as c where c.courseID = r.courseID 
    and c.courseID = ${courseID}`;
        return db.load(sql);
    },
    // get discount
    getDiscountCourse(courseID) {
        const sql = `select percent from ${config.DATABASE.TABLE.SALE} as s, 
    ${config.DATABASE.TABLE.COURSE} as c where c.courseID = s.courseID 
    and c.courseID = ${courseID}
    `;
        return db.load(sql);
    },

    getAllSearchCoure(content) {
        const sql = `select c.* from course c join category cat on cat.catID = c.catID where (match (c.courseName) against ('${content}') or match (cat.catName) against ('${content}'))`;
        return db.load(sql);
    },
    pagiSearchCourse(content, offset) {
        const sql = `select c.* from course c join category cat on cat.catID = c.catID where match (c.courseName) against ('${content}') or match (cat.catName) against (${content}) limit ${config.pagination.limit} offset ${offset}`;
        return db.load(sql);
    },

    pagiListSearchCourse(content, offset, limit) {
        const sql = `select c.* from course c join category cat 
        on cat.catID = c.catID
    where match (c.courseName) against ('${content}')
    or match (cat.catName) against ('${content}') limit ${limit} offset ${offset}`;
        return db.load(sql);
    },
    pagiListSearchCoursePrice(content, offset, limit) {
        const sql = `select c.* from course c join category cat 
        on cat.catID = c.catID
    where match (c.courseName) against ('${content}')
    or match (cat.catName) against ('${content}')
    order by c.fee
    limit ${limit} offset ${offset}`;
        return db.load(sql);
    },
    pagiListSearchCourseStar(content, offset, limit) {
        const sql = `  select cs.* from review r right join 
        (select c.* from course c join category cat 
            on cat.catID = c.catID
        where match (c.courseName) against ('${content}')
        or match (cat.catName) against ('${content}')) as cs
        on cs.courseID = r.courseID
    group by cs.courseID
    order by avg(r.rating) desc
    limit ${limit} offset ${offset}`;
        return db.load(sql);
    },

    pagiListSearchCourseByCat(content, catID, offset, limit) {
        const sql = `select c.* from course c join category cat 
        on cat.catID = c.catID and c.catID = ${catID}
    where match (c.courseName) against ('${content}')
    or match (cat.catName) against ('${content}')  limit ${limit}  offset ${offset}`;
        return db.load(sql);
    },

    pagiListSearchCourseByCatPrice(content, catID, offset, limit) {
        const sql = `select c.* from course c join category cat 
        on cat.catID = c.catID and c.catID = ${catID}
    where match (c.courseName) against ('${content}')
    or match (cat.catName) against ('${content}')
    order by c.fee
     limit ${limit} offset ${offset}`;
        return db.load(sql);
    },
    pagiListSearchCourseByCatStar(content, catID, offset, limit) {
        const sql = `  select cs.* from review r right join 
        (select c.* from course c join category cat 
            on cat.catID = c.catID and c.catID = ${catID}
        where match (c.courseName) against ('${content}')
        or match (cat.catName) against ('${content}')) as cs
        on cs.courseID = r.courseID
    group by cs.courseID
    order by avg(r.rating) desc
    limit ${limit} offset ${offset}`;
        return db.load(sql);
    },
    // get catName
    getCatName(courseID) {
        const sql = `select ca.catName
    from ${config.DATABASE.TABLE.CATEGORY} ca, ${config.DATABASE.TABLE.COURSE} c
    where ca.catID = c.catID and c.courseID = ${courseID}`;
        return db.load(sql);
    },

    getMostBuyWeek() {
        const sql = `SELECT count(cb.courseID), c.*
    FROM ${config.DATABASE.TABLE.COURSE} c, ${config.DATABASE.TABLE.COURSE_BOUGHT} cb
    where c.courseID = cb.courseID and DATEDIFF(CURDATE(),cb.dayBought) < 7
    group by cb.courseID
    order by count(cb.courseID) desc
    limit 4;`;
        return db.load(sql);
    },

    getReviewCourseNumb(courseID) {
        const sql = `select count(*) from ${config.DATABASE.TABLE.REVIEW} where courseID = ${courseID}`;
        return db.load(sql);
    },

    getCourseBoughtNumb(courseID) {
        const sql = `select count(*) from ${config.DATABASE.TABLE.COURSE_BOUGHT} where courseID = ${courseID}`;
        return db.load(sql);
    },

    getCourseChapters(courseID) {
        const sql = `select * from ${config.DATABASE.TABLE.CHAPTER} where courseID = ${courseID}`;
        return db.load(sql);
    },

    getCourseUnits(courseID) {
        const sql = `select distinct u.* from ${config.DATABASE.TABLE.CHAPTER} as c, ${config.DATABASE.TABLE.UNIT} as u
    where c.courseID = ${courseID}`;
        return db.load(sql);
    },

    getAveRatingCourse(courseID) {
        const sql = `select round(sum(rating)/count(*),2) from ${config.DATABASE.TABLE.REVIEW} as r, 
    ${config.DATABASE.TABLE.COURSE} as c where c.courseID = r.courseID 
    and c.courseID = ${courseID}`;
        return db.load(sql);
    },
    // get discount
    getDiscountCourse(courseID) {
        const sql = `select percent from ${config.DATABASE.TABLE.SALE} as s, 
    ${config.DATABASE.TABLE.COURSE} as c where c.courseID = s.courseID 
    and c.courseID = ${courseID}
    `;
        return db.load(sql);
    },

    getAllDiscountCourse() {
        const sql = `select * from ${config.DATABASE.TABLE.SALE} as s, 
    ${config.DATABASE.TABLE.COURSE} as c, ${config.DATABASE.TABLE.USER} as u where c.courseID = s.courseID and u.userID = c.userID`;
        return db.load(sql);
    },
    getOrderCourseByUserIDAndCourseID(courseID, userID) {
        const sql = `select * from ${config.DATABASE.TABLE.ORDERS} o join ${config.DATABASE.TABLE.ORDERDETAILS} od  
                    on o.orderID = od.orderID 
                    where  o.userID = ${[userID]} and od.courseID = ${courseID}`;
        return db.load(sql);
    }
};