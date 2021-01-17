const db = require("../utils/db");
const config = require("./../config/default.json");

const TBL_COURSE = "course";
const TBL_CATEGORY = "category";
const TBL_USER = "users";

module.exports = {
    all() {
        const sql = `select * from  ${TBL_COURSE} where ${TBL_COURSE}.isDisabled = 0`;
        return db.load(sql);
    },
    pagiCourse(offset) {
        const sql = `select * from ${TBL_COURSE} where ${TBL_COURSE}.isDisabled = 0
         limit ${config.admin.course.pagination.limit} offset ${offset}`;
        return db.load(sql);
    },

    pagiListCourse(offset, limit) {
        const sql = `select * from ${TBL_COURSE} where ${TBL_COURSE}.isDisabled = 0
         limit ${limit} offset ${offset}`;
        return db.load(sql);
    },
    addCourse(entity) {
        return db.add(entity, TBL_COURSE);
    },
    getCourseByName(courseName) {
        const sql = `select * from ${TBL_COURSE} where courseName = "${courseName}"  and  ${TBL_COURSE}.isDisabled = 0`;
        return db.load(sql);
    },
    getCourseByID(courseID) {
        const sql = `select * from ${TBL_COURSE} where courseID = ${courseID} and  ${TBL_COURSE}.isDisabled = 0`;
        return db.load(sql);
    },
    getCourseByCourseName(courseName) {
        const sql = `select * from ${TBL_COURSE} where courseName= "${courseName}" and  ${TBL_COURSE}.isDisabled = 0`;
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
        const sql = `select * from ${TBL_COURSE} where  ${TBL_COURSE}.isDisabled = 0
         order by fee limit ${limit} offset ${offset}`;
        return db.load(sql);
    },
    pagiListCourseStart(offset, limit) {
        const sql = `select cs.* from ${TBL_COURSE} cs left join review r on cs.courseID = r.courseID
        where cs.isDisabled = 0
        group by cs.courseID
        order by avg(r.rating) desc
        limit ${limit} offset ${offset}`;
        return db.load(sql);
    },

    pagiListCourseByCat(catID, offset, limit) {
        const sql = `select * from ${TBL_COURSE} where catID="${catID}"  and  ${TBL_COURSE}.isDisabled = 0 limit ${limit}  offset ${offset}`;
        return db.load(sql);
    },
    pagiListCourseByCatPrice(catID, offset, limit) {
        const sql = `select * from ${TBL_COURSE} where catID ="${catID}" and  ${TBL_COURSE}.isDisabled = 0
         order by fee limit ${limit} offset ${offset}`;

        return db.load(sql);
    },
    pagiListCourseByCatStar(catID, offset, limit) {
        const sql = `select cs.* from ${TBL_COURSE} cs left join review r on cs.courseID = r.courseID
        where cs.catID ="${catID}" and  cs.isDisabled = 0
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
        const sql = `select c.* from course c join category cat on cat.catID = c.catID 
        where ((match (c.courseName) against ('${content}') or match (cat.catName) against ('${content}'))) and  c.isDisabled = 0`;
        return db.load(sql);
    },
    pagiSearchCourse(content, offset) {
        const sql = `select c.* from course c join category cat on cat.catID = c.catID and  c.isDisabled = 0
         where (match (c.courseName) against ('${content}') or match (cat.catName) against (${content}))  and c.isDisabled = 0
         limit ${config.pagination.limit} offset ${offset}`;
        return db.load(sql);
    },

    pagiListSearchCourse(content, offset, limit) {
        const sql = `select c.* from course c join category cat 
        on cat.catID = c.catID
    where (match (c.courseName) against ('${content}')
    or match (cat.catName) against ('${content}')) and  c.isDisabled = 0
    limit ${limit} offset ${offset}`;
        return db.load(sql);
    },
    pagiListSearchCoursePrice(content, offset, limit) {
        const sql = `select c.* from course c join category cat 
        on cat.catID = c.catID
    where (match (c.courseName) against ('${content}')
    or match (cat.catName) against ('${content}')) and c.isDisabled = 0
    order by c.fee
    limit ${limit} offset ${offset}`;
        return db.load(sql);
    },
    pagiListSearchCourseStar(content, offset, limit) {
        const sql = `  select cs.* from review r right join 
        (select c.* from course c join category cat 
            on cat.catID = c.catID
        where (match (c.courseName) against ('${content}')
        or match (cat.catName) against ('${content}')) and  c.isDisabled = 0) as cs
        on cs.courseID = r.courseID
    group by cs.courseID
    order by avg(r.rating) desc
    limit ${limit} offset ${offset}`;
        return db.load(sql);
    },

    pagiListSearchCourseByCat(content, catID, offset, limit) {
        const sql = `select c.* from course c join category cat 
        on cat.catID = c.catID and c.catID = ${catID}
    where (match (c.courseName) against ('${content}')
    or match (cat.catName) and  c.isDisabled = 0)
     against ('${content}')  limit ${limit}  offset ${offset}`;
        return db.load(sql);
    },

    pagiListSearchCourseByCatPrice(content, catID, offset, limit) {
        const sql = `select c.* from course c join category cat 
        on cat.catID = c.catID and c.catID = ${catID}
    where (match (c.courseName) against ('${content}')
    or match (cat.catName) against ('${content}')  and  c.isDisabled = 0)
    order by c.fee
    limit ${limit} offset ${offset}`;
        return db.load(sql);
    },
    pagiListSearchCourseByCatStar(content, catID, offset, limit) {
        const sql = `  select cs.* from review r right join 
        (select c.* from course c join category cat 
            on cat.catID = c.catID and c.catID = ${catID}
        where (match (c.courseName) against ('${content}')
        or match (cat.catName) against ('${content}')  and  c.isDisabled = 0)) as cs
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
    where c.courseID = cb.courseID and DATEDIFF(CURDATE(),cb.dayBought) < 7  and  c.isDisabled = 0
    group by cb.courseID
    order by count(cb.courseID) desc
    limit 4;`;
        return db.load(sql);
    },

    getTopFiveRelated(subjectID) {
        const sql = `select o.courseID
        from ${config.DATABASE.TABLE.ORDERDETAILS} o, ${config.DATABASE.TABLE.COURSE} c, ${config.DATABASE.TABLE.CATEGORY} cat
        where o.courseID = c.courseID and c.catID = cat.catId and cat.subjId = ${subjectID}  and  c.isDisabled = 0
        group by o.courseID
        limit 5`;
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
    ${config.DATABASE.TABLE.COURSE} as c, ${config.DATABASE.TABLE.USER} as u 
    where c.courseID = s.courseID and u.userID = c.userID  and  c.isDisabled = 0`;
        return db.load(sql);
    },
    getOrderCourseByUserIDAndCourseID(courseID, userID) {
        const sql = `select * from ${config.DATABASE.TABLE.ORDERS} o join ${
      config.DATABASE.TABLE.ORDERDETAILS
    } od 
                    on o.orderID = od.orderID join  ${TBL_COURSE} c on c.courseID = ${courseID}
                    where  o.userID = ${[
                      userID,
                    ]} and od.courseID = ${courseID} and c.isDisabled = 0`;
        return db.load(sql);
    },

    getAllCouseByInstructorId(instructorID) {
        const sql = `select courseName, courseID from ${TBL_COURSE} where userID = ${instructorID}  and  isDisabled = 0`;
        return db.load(sql);
    },

    getCourseBestSeller() {
        const sql = `select od.courseID as courseID, count(*) as amount  from orders o join orderdetails od on o.orderID = od.orderID
        join ${TBL_COURSE} c on c.courseID = od.courseID
        where c.isDisabled = 0
        group by od.courseID
        order by count(*) desc
        limit 4`;
        return db.load(sql);
    },
    getCourseNew() {
        const sql = `select *
        from course c 
        where datediff( curdate(),c.dayPost) < 7 and c.isDisabled = 0`;
        return db.load(sql);
    },

    getInstructorOfCourse(courseID) {
        const sql = `select userName from ${config.DATABASE.TABLE.USER} as us,
        ${config.DATABASE.TABLE.COURSE} as c 
        where us.userID = c.userID and c.courseID = ${courseID}
        `;
        return db.load(sql);
    },

    getAllInstructor() {
        const sql = `select userName from ${config.DATABASE.TABLE.USER} 
        where decentralization = 1
        `;
        return db.load(sql);
    },
    disableCourse(courseID) {
        const sql = `update ${config.DATABASE.TABLE.COURSE}
        set isDisabled = 1
        where courseID = ${courseID}
        `;
        return db.load(sql);
    },
    enableCourse(courseID) {
        const sql = `update ${config.DATABASE.TABLE.COURSE}
        set isDisabled = 0
        where courseID = ${courseID}
        `;
        return db.load(sql);
    },

    delChapAnddelUnitByCourseID(courseID) {
        const sql = `
        delete chap,un
        from ${config.DATABASE.TABLE.CHAPTER} as chap
        join ${config.DATABASE.TABLE.UNIT} as un
        on chap.chapterID = un.chapterID
        where chap.courseID = ${courseID}
    `;
        return db.load(sql);
    },
};