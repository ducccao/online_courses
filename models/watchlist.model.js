const db = require("../utils/db");

const TBL_CATEGORIES = "category";
const TBL_WATCHLIST = "watchlist";
const TBL_COURSE = "course";

module.exports = {
    allSearchWithDetails(content, userID) {
        const sql = `
    select c.*, count(p.courseID) as CourseCount
    from ${TBL_CATEGORIES} c left join (select c.catID as catID, c.courseID as courseID
                                      from course c join category cat on cat.catID = c.catID
                                      join watchlist w on w.courseID = c.courseID
                                       where (match (c.courseName) 
                                            against ('${content}') or match (cat.catName) against ('${content}'))and w.userID = ${userID} and  c.isDisabled = 0) as p
                            on c.catID = p.catID
    group by c.catID, c.catName`;
        return db.load(sql);
    },
    allCat() {
        const sql = `select * from ${TBL_CATEGORIES}`;
        return db.load(sql);
    },

    getCateByID(catID) {
        const sql = `select * from ${TBL_CATEGORIES} where catID = ${catID} `;
        return db.load(sql);
    },

    allCatWithDetails(userID) {
        const sql = `
        select c.*, count(watch.courseID) as CourseCount
        from category  c left join  
            (select course.catID as catID, course.courseID as courseID
                from watchlist as w join course   on course.courseID = w.courseID  
                where   w.userID = ${userID} and course.isDisabled = 0 ) as watch
        on watch.catID = c.catID
        group by c.catID, c.catName`;
        return db.load(sql);
    },


    allCourse(userID) {
        const sql = `select c.* from course c join watchlist w on w.courseID = c.courseID where w.userID = ${userID} and c.isDisabled = 0`;
        return db.load(sql);
    },
    pagiCourse(offset, userID) {
        const sql = `select c.* from course c join watchlist w on w.courseID = c.courseID where w.userID = ${userID} and  c.isDisabled = 0
        limit ${config.pagination.limit} offset ${offset}`;
        return db.load(sql);
    },

    pagiListCourse(offset, limit, userID) {
        const sql = `select c.* from course c join watchlist w on w.courseID = c.courseID where w.userID = ${userID} and c.isDisabled = 0
        order by c.fee
        limit ${limit} offset ${offset}`;
        return db.load(sql);
    },
    pagiListCoursePrice(offset, limit, userID) {
        const sql = `select c.* from course c join watchlist w on w.courseID = c.courseID where w.userID = ${userID} and c.isDisabled = 0
        order by c.fee
        limit ${limit} offset ${offset}`;
        return db.load(sql);
    },
    pagiListCourseStar(offset, limit, userID) {

        const sql = `select cs.* from course cs left join review r on cs.courseID = r.courseID
                 join watchlist w on w.courseID = cs.courseID where w.userID = ${userID} and cs.isDisabled = 0
         group by cs.courseID
         order by avg(r.rating) desc
         limit ${limit} offset ${offset}`;
        return db.load(sql);
    },

    pagiListCourseByCat(catID, offset, limit, userID) {
        const sql = `select c.* from course c join watchlist w on w.courseID = c.courseID 
        where w.userID = ${userID} and catID="${catID}" and c.isDisabled = 0
        limit ${limit}  offset ${offset}`;
        return db.load(sql);
    },
    pagiListCourseByCatPrice(catID, offset, limit, userID) {
        const sql = `select c.* from course c join watchlist w on w.courseID = c.courseID 
        where w.userID = ${userID} and c.catID="${catID}" and c.isDisabled = 0
        order by c.fee
        limit ${limit}  offset ${offset}`;
        return db.load(sql);
    },
    pagiListCourseByCatStar(catID, offset, limit, userID) {
        const sql = `select cs.* from course cs left join review r on cs.courseID = r.courseID
        join watchlist w on w.courseID = cs.courseID
        where w.userID = ${userID} and cs.catID = ${catID} and cs.isDisabled = 0
        group by cs.courseID
        order by avg(r.rating) desc
        limit ${limit} offset ${offset}`;
        return db.load(sql);
    },

    /*    addCourse(entity) {
            return db.add(entity, TBL_COURSE);
        },
    */
    getCourseByName(courseName) {
        const sql = `select * from ${TBL_COURSE} where courseName = "${courseName}" and isDisabled = 0`;
        return db.load(sql);
    },
    getCourseByID(courseID) {
        const sql = `select * from ${TBL_COURSE} where courseID = ${courseID} and isDisabled = 0`;
        return db.load(sql);
    },
    getCourseByCourseName(courseName) {
        const sql = `select * from ${TBL_COURSE} where courseName= "${courseName}" and isDisabled = 0`;
        return db.load(sql);
    },


    addWatchlistCourse(entity) {
        return db.add(entity, TBL_WATCHLIST);
    },

    delWatchlistCourse(entity) {

        const sql = `delete from watchlist w where w.courseID = ${entity.courseID} and w.userID = ${entity.userID}`
        return db.load(sql);
    },
    getAllSearchCoure(content, userID) {
        const sql = `select c.* from course c join category cat 
                            on cat.catID = c.catID join watchlist w on w.courseID = c.courseID
                            where (match (c.courseName) against ('${content}') or match (cat.catName) against ('${content}')) and w.userID = ${userID} and c.isDisabled = 0`;
        return db.load(sql);
    },
    pagiSearchCourse(content, offset, userID) {
        const sql = `select c.* from course c join category cat 
        on cat.catID = c.catID join watchlist w on w.courseID = c.courseID
        where (match (c.courseName) against ('${content}') or match (cat.catName) against ('${content}')) and w.userID = ${userID} and c.isDisabled = 0
        limit ${config.pagination.limit} offset ${offset}`;
        return db.load(sql);
    },
    pagiListSearchCourse(content, offset, limit, userID) {
        const sql = ` select c.* from course c join category cat 
        on cat.catID = c.catID join watchlist w on w.courseID = c.courseID
        where (match (c.courseName) against ('${content}') or match (cat.catName) against ('${content}')) and w.userID = ${userID} and c.isDisabled = 0
    limit ${limit} offset ${offset}`;
        return db.load(sql);
    },
    pagiListSearchCoursePrice(content, offset, limit, userID) {
        const sql = `select c.* from course c join category cat 
        on cat.catID = c.catID join watchlist w on w.courseID = c.courseID
        where (match (c.courseName) against ('${content}') or match (cat.catName) against ('${content}')) and w.userID = ${userID} and c.isDisabled = 0
        order by c.fee
    limit ${limit} offset ${offset}`;
        return db.load(sql);
    },
    pagiListSearchCourseStar(content, offset, limit, userID) {
        const sql = `  select cs.* from review r right join 
        (select c.* from course c join category cat 
            on cat.catID = c.catID
        where (match (c.courseName) against ('${content}')
        or match (cat.catName) against ('${content}') and c.isDisabled = 0)) as cs
        on cs.courseID = r.courseID
        join watchlist w on w.courseID = cs.courseID where w.userID = ${userID}
    group by cs.courseID
    order by avg(r.rating) desc
    limit ${limit} offset ${offset}`;
        return db.load(sql);

    },

    pagiListSearchCourseByCat(content, catID, offset, limit, userID) {
        const sql = `select c.* from course c join category cat 
        on cat.catID = c.catID and c.catID = ${catID} 
        join watchlist w on w.courseID = c.courseID 
    where (match (c.courseName) against ('${content}')
    or match (cat.catName) against ('${content}'))
   and w.userID = ${userID} and c.isDisabled = 0
     limit ${limit}  offset ${offset}`;
        return db.load(sql);
    },

    pagiListSearchCourseByCatPrice(content, catID, offset, limit, userID) {
        const sql = `select c.* from course c join category cat 
        on cat.catID = c.catID and c.catID = ${catID} 
        join watchlist w on w.courseID = c.courseID 
    where (match (c.courseName) against ('${content}')
    or match (cat.catName) against ('${content}'))
   and w.userID = ${userID} and c.isDisabled = 0
   order by c.fee
     limit ${limit}  offset ${offset}`;
        return db.load(sql);
    },
    pagiListSearchCourseByCatStar(content, catID, offset, limit, userID) {
        const sql = `  select cs.* from review r right join 
        (select c.* from course c join category cat 
            on cat.catID = c.catID and c.catID = ${catID}
        where match (c.courseName) against ('${content}')
        or match (cat.catName) against ('${content}')) as cs
        on cs.courseID = r.courseID
        join watchlist w on w.courseID = cs.courseID 
        where w.userID = ${userID} and cs.isDisabled = 0
    group by cs.courseID
    order by avg(r.rating) desc
    limit ${limit} offset ${offset}`;
        return db.load(sql);
    },

    getCourseByCourseIDAndUserID(courseID, userID) {
        const sql = `select * from watchlist w where w.courseID =${courseID} and w.userID = ${userID}`;
        return db.load(sql);
    }

};