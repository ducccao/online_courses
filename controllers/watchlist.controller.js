const cateModel = require("./../models/category.model");
const courseModel = require("./../models/course.model");
const userModel = require("./../models/user.model");
const config = require("./../config/default.json");
const { averageArrayRating } = require("./../utils/utilsFunction");

const watchlistModel = require("../models/watchlist.model");

const mainController = {
    // get List Course page
    getListCourses: async(req, res) => {
        if (req.session.isAuth === true) {
            let sort = req.query.sort || "";

            req.session.searchContentListCourse = "";
            console.log("List Course Paginating!!");
            //  const allCate = await cateModel.all();
            const courseInCat = await watchlistModel.allCatWithDetails(
                req.session.authUser.userID
            );
            //console.log(courseInCat);
            const allCourse = await watchlistModel.allCourse(
                req.session.authUser.userID
            );
            // console.log(allCourse);
            //  let isAdmin = false;
            //console.log("main controller: ", req.session.authUser);
            let page = +req.query.page || 1;
            if (page < 0) {
                page = 1;
            }
            const limit = config.listCourses.pagination.limit;
            // console.log(limit);
            const offset = (page - 1) * 6;
            // console.log(offset);
            let rows = [];

            if (sort === "price") {
                rows = await watchlistModel.pagiListCoursePrice(offset, limit, req.session.authUser.userID);
            } else if (sort === "star") {
                rows = await watchlistModel.pagiListCourseStar(offset, limit, req.session.authUser.userID);
            } else {
                rows = await watchlistModel.pagiListCourse(offset, limit, req.session.authUser.userID);
            }
            const total = allCourse.length;
            const nPage = Math.ceil(total / limit);
            const pagiItem = [];

            for (let i = 1; i <= nPage; i++) {
                const item = {
                    value: i,
                    isActive: page === i,
                };
                pagiItem.push(item);
            }

            // get cat type
            const nextRows = [];

            for (let i = 0; i < rows.length; i++) {
                const subjID = await courseModel.getTypeOfCourse(
                    rows[i].courseID,
                    rows[i].catID
                );
                //  console.log(rows[i]);
                console.log(subjID);
                const item = {
                    ...rows[i],
                    subjID: subjID.length !== 0 ? subjID[0].subjID : 0,
                };
                nextRows.push(item);
            }
            //  console.log(rows);
            // const typeOfCourse = await courseModel.getTypeOfCourse(1, 1);
            // console.log(nextRows);

            // instructor
            const thirdRows = [];
            for (let i = 0; i < nextRows.length; ++i) {
                const instructor = await courseModel.getInstructor(
                    nextRows[i].courseID,
                    nextRows[i].userID
                );
                //console.log(instructor);
                const item = {
                    ...nextRows[i],
                    ...instructor[0],
                };
                thirdRows.push(item);
            }
            // console.log(thirdRows[0]);
            // rating course
            const fourthRows = [];
            for (let i = 0; i < thirdRows.length; i++) {
                // rating
                const ratingArray = await courseModel.getRatingCourse(
                    thirdRows[i].courseID
                );
                const averageRating = averageArrayRating(ratingArray);
                //   console.log(averageRating);
                // discount
                const discount = await courseModel.getDiscountCourse(
                    thirdRows[i].courseID
                );
                //  console.log(discount);
                const item = {
                    ...thirdRows[i],
                    rating: typeof + averageRating === "number" ? averageRating : 0,
                    countPeopleRating: ratingArray.length,
                    discount: discount.length !== 0 ? discount[0].percent : 0,
                };
                fourthRows.push(item);
            }
            // console.log(fourthRows);

            res.render("vwWatchlist/listCourse", {
                layout: "main",
                courseInCat: courseInCat,
                allCourse: fourthRows,
                //   isAdmin: isAdmin,
                //pagi
                showPagi: true,
                pagiItem: pagiItem,
                can_go_prev: page > 1,
                can_go_next: page < nPage,
                go_next_page: page + 1,
                go_previous_page: page - 1,
            });
        } else {
            throw Error("access denied");
        }


    },
    // get course list by cat
    getCourseListByCat: async(req, res) => {
        if (req.session.isAuth === true) {
            console.log("Get list course by cat !");
            let sort = req.query.sort || "";
            let rows = [];
            let courseInCat = [];
            let pagiItem = [];
            let page = [];
            let nPage = [];

            //truong hop dang search
            if (req.session.searchContentListCourse !== undefined && req.session.searchContentListCourse !== "") {
                courseInCat = await watchlistModel.allCatWithDetails(
                    req.session.authUser.userID
                );
                //console.log(courseInCat);
                const allCourse = await watchlistModel.allCourse(
                    req.session.authUser.userID
                );
                const catID = +req.params.id;
                page = +req.query.page || 1;

                if (page === 0) {
                    page = 1;
                }

                let total = 0;
                for (let i = 0; i < courseInCat.length; i++) {
                    //  console.log(courseInCat[i].catID);
                    if (+courseInCat[i].catID === +catID) {
                        //  console.log("trueasds");
                        total = courseInCat[i].CourseCount;
                    }
                }

                const limit = config.listCourses.pagination.limit;
                const offset = (page - 1) * limit;
                if (sort === "price") {
                    rows = await watchlistModel.pagiListSearchCourseByCatPrice(req.session.searchContentListCourse, catID, offset, limit, req.session.authUser.userID);
                } else if (sort === "star") {
                    rows = await watchlistModel.pagiListSearchCourseByCatStar(req.session.searchContentListCourse, catID, offset, limit, req.session.authUser.userID);
                } else {
                    rows = await watchlistModel.pagiListSearchCourseByCat(req.session.searchContentListCourse, catID, offset, limit, req.session.authUser.userID);
                }
                //   console.log("row len: ", rows.length);
                //  console.log("total ", total);
                nPage = Math.ceil(total / limit);
                for (let i = 1; i <= nPage; ++i) {
                    const item = {
                        value: i,
                        isActive: page === i,
                    };
                    pagiItem.push(item);
                }

            } else {
                courseInCat = await watchlistModel.allCatWithDetails(
                    req.session.authUser.userID
                );
                //  console.log(courseInCat);
                const allCourse = await watchlistModel.allCourse(
                    req.session.authUser.userID
                );
                const catID = +req.params.id;
                page = +req.query.page || 1;

                if (page === 0) {
                    page = 1;
                }

                let total = 0;
                for (let i = 0; i < courseInCat.length; i++) {
                    //  console.log(courseInCat[i].catID);
                    if (+courseInCat[i].catID === +catID) {
                        //  console.log("trueasds");
                        total = courseInCat[i].CourseCount;
                    }
                }

                const limit = config.listCourses.pagination.limit;
                const offset = (page - 1) * limit;

                if (sort === "price") {
                    rows = await watchlistModel.pagiListCourseByCatPrice(catID, offset, limit, req.session.authUser.userID);
                } else if (sort === "star") {
                    rows = await watchlistModel.pagiListCourseByCatStar(catID, offset, limit, req.session.authUser.userID);
                } else {
                    rows = await watchlistModel.pagiListCourseByCat(catID, offset, limit, req.session.authUser.userID);
                }
                //   console.log("row len: ", rows.length);
                //  console.log("total ", total);
                nPage = Math.ceil(total / limit);
                for (let i = 1; i <= nPage; ++i) {
                    const item = {
                        value: i,
                        isActive: page === i,
                    };
                    pagiItem.push(item);
                }

            }

            // get cat type
            const nextRows = [];

            for (let i = 0; i < rows.length; i++) {
                const subjID = await courseModel.getTypeOfCourse(
                    rows[i].courseID,
                    rows[i].catID
                );
                //  console.log(rows[i]);
                // console.log(subjID);
                const item = {
                    ...rows[i],
                    subjID: subjID[0].subjID,
                };
                nextRows.push(item);
            }
            //  console.log(rows);
            // const typeOfCourse = await courseModel.getTypeOfCourse(1, 1);
            // console.log(nextRows);

            // instructor
            const thirdRows = [];
            for (let i = 0; i < nextRows.length; ++i) {
                const instructor = await courseModel.getInstructor(
                    nextRows[i].courseID,
                    nextRows[i].userID
                );
                //console.log(instructor);
                const item = {
                    ...nextRows[i],
                    ...instructor[0],
                };
                thirdRows.push(item);
            }
            // console.log(thirdRows[0]);
            // rating course
            const fourthRows = [];
            for (let i = 0; i < thirdRows.length; i++) {
                // rating
                const ratingArray = await courseModel.getRatingCourse(
                    thirdRows[i].courseID
                );
                const averageRating = averageArrayRating(ratingArray);
                //   console.log(averageRating);
                // discount
                const discount = await courseModel.getDiscountCourse(
                    thirdRows[i].courseID
                );
                //    console.log(discount);
                const item = {
                    ...thirdRows[i],
                    rating: typeof + averageRating === "number" ? averageRating : 0,
                    countPeopleRating: ratingArray.length,
                    discount: discount.length !== 0 ? discount[0].percent : 0,
                };
                fourthRows.push(item);
            }
            // console.log(fourthRows);

            res.render("vwWatchlist/listCourse", {
                layout: "main",
                courseInCat: courseInCat,
                allCourse: fourthRows,
                empty: rows.length === 0,
                //pagi
                showPagi: true,
                pagiItem: pagiItem,
                can_go_prev: page > 1,
                can_go_next: page < nPage,
                go_next_page: page + 1,
                go_previous_page: page - 1,
            });
        } else {
            throw Error("access denied");
        }
    },

    getAllCourse: async(req, res) => {
        console.log("Get list course to mainNav !");
        const allCourse = await courseModel.all();
        console.log(allCourse);
        res.render("vwAdminCourse/home", {
            layout: "admin",
            allCourse,
        });
    },

    searchCourse: async(req, res) => {
        console.log("List Course Paginating!!");
        let sort = req.query.sort || "";
        //  const allCate = await cateModel.all();
        console.log(req.body.searchContentListCourse);
        if ((req.body.searchContentListCourse !== undefined || req.session.searchContentListCourse !== undefined) && req.session.isAuth === true) {
            if (req.body.searchContentListCourse !== undefined) {
                req.session.searchContentListCourse = req.body.searchContentListCourse;
            }
            const courseInCat = await watchlistModel.allSearchWithDetails(req.session.searchContentListCourse, req.session.authUser.userID);
            //console.log(courseInCat);
            const allCourse = await watchlistModel.getAllSearchCoure(req.session.searchContentListCourse, req.session.authUser.userID);

            let page = +req.query.page || 1;
            if (page < 0) {
                page = 1;
            }
            const limit = config.listCourses.pagination.limit;
            console.log(limit);
            const offset = (page - 1) * 6;
            // console.log(offset);
            let rows = [];
            if (sort === "price") {
                console.log("-------------------------------------");
                rows = await watchlistModel.pagiListSearchCoursePrice(req.session.searchContentListCourse, offset, limit, req.session.authUser.userID);
            } else if (sort === "star") {
                rows = await watchlistModel.pagiListSearchCourseStar(req.session.searchContentListCourse, offset, limit, req.session.authUser.userID);
            } else {
                rows = await watchlistModel.pagiListSearchCourse(req.session.searchContentListCourse, offset, limit, req.session.authUser.userID);
            }

            // const rows = await courseModel.pagiListCourse(offset, limit);

            const total = allCourse.length;
            const nPage = Math.ceil(total / limit);
            const pagiItem = [];

            for (let i = 1; i <= nPage; i++) {
                const item = {
                    value: i,
                    isActive: page === i,
                };
                pagiItem.push(item);
            }

            // get cat type
            const nextRows = [];

            for (let i = 0; i < rows.length; i++) {
                const subjID = await courseModel.getTypeOfCourse(
                    rows[i].courseID,
                    rows[i].catID
                );
                //  console.log(rows[i]);
                console.log(subjID);
                const item = {
                    ...rows[i],
                    subjID: subjID.length !== 0 ? subjID[0].subjID : 0,
                };
                nextRows.push(item);
            }
            //  console.log(rows);
            // const typeOfCourse = await courseModel.getTypeOfCourse(1, 1);
            // console.log(nextRows);

            // instructor
            const thirdRows = [];
            for (let i = 0; i < nextRows.length; ++i) {
                const instructor = await courseModel.getInstructor(
                    nextRows[i].courseID,
                    nextRows[i].userID
                );
                //console.log(instructor);
                const item = {
                    ...nextRows[i],
                    ...instructor[0],
                };
                thirdRows.push(item);
            }
            // console.log(thirdRows[0]);
            // rating course
            const fourthRows = [];
            for (let i = 0; i < thirdRows.length; i++) {
                // rating
                const ratingArray = await courseModel.getRatingCourse(
                    thirdRows[i].courseID
                );
                const averageRating = averageArrayRating(ratingArray);
                //   console.log(averageRating);
                // discount
                const discount = await courseModel.getDiscountCourse(
                    thirdRows[i].courseID
                );
                //  console.log(discount);
                const item = {
                    ...thirdRows[i],
                    rating: typeof + averageRating === "number" ? averageRating : 0,
                    countPeopleRating: ratingArray.length,
                    discount: discount.length !== 0 ? discount[0].percent : 0,
                };
                fourthRows.push(item);
            }
            // console.log(fourthRows);

            res.render("vwWatchlist/listCourse", {
                layout: "main",
                courseInCat: courseInCat,
                allCourse: fourthRows,
                //   isAdmin: isAdmin,
                //pagi
                showPagi: true,
                pagiItem: pagiItem,
                can_go_prev: page > 1,
                can_go_next: page < nPage,
                go_next_page: page + 1,
                go_previous_page: page - 1,
            });

        } else {
            throw Error("access denied");
        }

    },

    editWatchlist: (req, res) => {
        const method = req.body.method;
        const enity = {
            courseID: req.body.courseID,
            userID: res.locals.authUser.userID,
        }
        if (method === "add") {

            watchlistModel.addWatchlistCourse(enity);
        } else {
            watchlistModel.delWatchlistCourse(enity);
        }
        let url = req.headers.referer || "/";
        res.redirect(url);
    }
};

module.exports = mainController;