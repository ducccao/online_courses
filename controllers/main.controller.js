const cateModel = require("./../models/category.model");
const courseModel = require("./../models/course.model");
const userModel = require("./../models/user.model");
const config = require("./../config/default.json");
const { averageArrayRating } = require("./../utils/utilsFunction");
const reviewModel = require("./../models/review.model");
const chapterModel = require("./../models/chapter.model");
const unitModel = require("./../models/unit.model");
const watchlistModel = require("../models/watchlist.model");

async function bestSeller() {
    return await courseModel.getCourseBestSeller();
}

async function newCourse() {
    return await courseModel.getCourseNew();
}

const mainController = {
    // get List Course page
    getListCourses: async(req, res) => {
        let sort = req.query.sort || "";

        req.session.searchContentListCourse = "";
        console.log("List Course Paginating!!");
        //  const allCate = await cateModel.all();
        const courseInCat = await cateModel.allWithDetails();
        //console.log(courseInCat);
        const allCourse = await courseModel.all();
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
            rows = await courseModel.pagiListCoursePrice(offset, limit);
        } else if (sort === "star") {
            rows = await courseModel.pagiListCourseStart(offset, limit);
        } else {
            rows = await courseModel.pagiListCourse(offset, limit);
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

            const _discount = discount.length !== 0 ? discount[0].percent : 0;
            const discountedFee = thirdRows[i].fee * (1 - _discount / 100);
            //  console.log(discount);
            const item = {
                ...thirdRows[i],
                rating: typeof + averageRating === "number" ? averageRating : 0,
                countPeopleRating: ratingArray.length,
                discount: _discount,
                discountedFee,
            };
            fourthRows.push(item);
        }
        const fifthRows = [];
        for (let i = 0; i < rows.length; i++) {
            let isBestSeller = false;
            let isNewCourse = false;

            if (
                (await bestSeller()).find(
                    (element) => element.courseID == rows[i].courseID
                ) !== undefined
            ) {
                isBestSeller = true;
            }

            if (
                (await newCourse()).find(
                    (element) => element.courseID == rows[i].courseID
                ) !== undefined
            ) {
                isNewCourse = true;
            }
            const item = {
                ...fourthRows[i],
                isBestSeller,
                isNewCourse,
            };
            fifthRows.push(item);
        }

        // console.log(fourthRows);
        const webCatWithCourseCount = await cateModel.getWebCatWithCountCourse();
        const mobiCatWithCourseCount = await cateModel.getMobiCatWithCountCourse();

        // active cat
        for (let d of webCatWithCourseCount) {
            if (d.catID === +req.params.id) {
                c.isActive = true;
            }
        }
        for (let c of mobiCatWithCourseCount) {
            if (c.catID === +req.params.id) {
                c.isActive = true;
            }
        }

        //   console.log(webCatWithCourseCount);

        res.render("vwMain/ListCourses", {
            layout: "main",
            courseInCat: courseInCat,
            webCat: webCatWithCourseCount,
            mobiCat: mobiCatWithCourseCount,
            allCourse: fifthRows,
            //   isAdmin: isAdmin,
            //pagi
            showPagi: true,
            pagiItem: pagiItem,
            can_go_prev: page > 1,
            can_go_next: page < nPage,
            go_next_page: page + 1,
            go_previous_page: page - 1,
        });
    },
    // get course list by cat
    getCourseListByCat: async(req, res) => {
        console.log("Get list course by cat !");
        let sort = req.query.sort || "";
        let rows = [];
        let courseInCat = [];
        let pagiItem = [];
        let page = [];
        let nPage = [];

        if (
            req.session.searchContentListCourse !== undefined &&
            req.session.searchContentListCourse !== ""
        ) {
            courseInCat = await cateModel.allSearchWithDetails(
                req.session.searchContentListCourse
            );
            //  console.log(courseInCat);
            const allCourse = await courseModel.getAllSearchCoure(
                req.session.searchContentListCourse
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
                rows = await courseModel.pagiListSearchCourseByCatPrice(
                    req.session.searchContentListCourse,
                    catID,
                    offset,
                    limit
                );
            } else if (sort === "star") {
                rows = await courseModel.pagiListCourseByCatStar(catID, offset, limit);
            } else {
                rows = await courseModel.pagiListSearchCourseByCat(
                    req.session.searchContentListCourse,
                    catID,
                    offset,
                    limit
                );
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
            courseInCat = await cateModel.allWithDetails();
            //  console.log(courseInCat);
            const allCourse = await courseModel.all();
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
                rows = await courseModel.pagiListCourseByCatPrice(catID, offset, limit);
            } else if (sort === "star") {
                rows = await courseModel.pagiListCourseByCatStar(catID, offset, limit);
            } else {
                rows = await courseModel.pagiListCourseByCat(catID, offset, limit);
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

        const fifthRows = [];
        for (let i = 0; i < rows.length; i++) {
            let isBestSeller = false;
            let isNewCourse = false;

            if (
                (await bestSeller()).find(
                    (element) => element.courseID == rows[i].courseID
                ) !== undefined
            ) {
                isBestSeller = true;
            }

            if (
                (await newCourse()).find(
                    (element) => element.courseID == rows[i].courseID
                ) !== undefined
            ) {
                isNewCourse = true;
            }
            const item = {
                ...fourthRows[i],
                isBestSeller,
                isNewCourse,
            };
            fifthRows.push(item);
        }
        // console.log(fourthRows);

        const webCat = await cateModel.getWebCatWithCountCourse();
        const mobiCat = await cateModel.getMobiCatWithCountCourse();
        // active cate
        for (let c of webCat) {
            if (c.catID === +req.params.id) {
                c.isActive = true;
            }
        }
        for (let c of mobiCat) {
            if (c.catID === +req.params.id) {
                c.isActive = true;
            }
        }

        console.log(mobiCat);

        //    console.log(courseInCat);
        res.render("vwMain/ListCourses", {
            layout: "main",
            // cat
            courseInCat: courseInCat,
            webCat,
            mobiCat,
            allCourse: fifthRows,
            empty: rows.length === 0,

            //pagi
            showPagi: true,
            pagiItem: pagiItem,
            can_go_prev: page > 1,
            can_go_next: page < nPage,
            go_next_page: page + 1,
            go_previous_page: page - 1,
        });
    },

    getCourseDetail: async(req, res) => {
        const courseID = +req.params.id;
        const course = await courseModel.getCourseByID(courseID);
        console.log("here" + course[0].views);
        course[0].views += 1;
        console.log("here after" + course[0].views);
        const type = await courseModel.getTypeOfCourse(courseID, course[0].catID);
        const instructor = await courseModel.getInstructor(
            courseID,
            course[0].userID
        );
        const discount = await courseModel.getDiscountCourse(courseID);
        const catName = await courseModel.getCatName(courseID);
        const avgRating = await courseModel.getAveRatingCourse(courseID);
        const reviewNumb = await courseModel.getReviewCourseNumb(courseID);
        const studentNumb = await courseModel.getCourseBoughtNumb(courseID);
        const lastUpdateTime = course[0].lastUpdate.toISOString().slice(0, 10);
        const _discountP = discount.length > 0 ? discount[0].percent : 0;
        const discountedPrice = course[0].fee * (1 - _discountP / 100);
        const review = await reviewModel.getReview(courseID);

        //get 5 related courses
        const firstRow = await courseModel.getTopFiveRelated(type[0].subjID);

        const secondRow = [];
        for (let i = 0; i < firstRow.length; i++) {
            const course = await courseModel.getCourseByID(firstRow[i].courseID);
            secondRow.push(course);
        }

        const thirdRows = [];
        for (let i = 0; i < secondRow.length; ++i) {
            const instructor = await courseModel.getInstructor(
                secondRow[i][0].courseID,
                secondRow[i][0].userID
            );
            //console.log(instructor);
            const item = {
                ...secondRow[i][0],
                ...instructor[0],
            };
            thirdRows.push(item);
        }

        // console.log(thirdRows);
        // rating course
        const fourthRows = [];
        for (let i = 0; i < thirdRows.length; i++) {
            // rating
            const ratingArray = await courseModel.getRatingCourse(
                thirdRows[i].courseID
            );
            // console.log(ratingArray);

            const averageRating = averageArrayRating(ratingArray);
            // discount
            const discount = await courseModel.getDiscountCourse(
                thirdRows[i].courseID
            );

            const _discount = discount.length !== 0 ? discount[0].percent : 0;

            const discountedPrice = thirdRows[i].fee * (1 - _discount / 100);
            //  console.log(discount);
            const item = {
                ...thirdRows[i],
                rating: averageRating,
                countPeopleRating: ratingArray.length,
                discount: _discount,
                discountedPrice,
            };
            fourthRows.push(item);
        }

        let isExistedWatchlist = true;
        if (res.locals.authUser !== null && res.locals.authUser !== undefined) {
            console.log("hllo");
            const course = await watchlistModel.getCourseByCourseIDAndUserID(
                courseID,
                res.locals.authUser.userID
            );
            isExistedWatchlist = course.length === 1;
        }

        console.log(isExistedWatchlist);

        // console.log(fourthRows);

        courseDetail = {
            discountedPrice,
            lastUpdateTime,
            _discountP,
            ...course[0],
            ...type[0],
            ...instructor[0],
            ...catName[0],
            avgRating: avgRating[0]["round(sum(rating)/count(*),2)"],
            reviewNumb: reviewNumb[0]["count(*)"],
            student: studentNumb[0]["count(*)"],
            review: review,
            reviewEmpty: review.length === 0,
            isExistedWatchlist,
        };

        console.log(courseDetail);

        const chapters = await chapterModel.getAllChapterWithDurationByCourseID(
            courseID
        );

        const chaptersOfCourse = [];
        const unitsOfCourse = [];
        let totalHour = 0;
        let totalMin = 0;
        let totalSec = 0;
        let totalUnit = 0;
        for (let i = 0; i < chapters.length; i++) {
            totalUnit += +chapters[i].unitInChapter;

            let hour = +chapters[i].chapterTotalHour;
            let min = +chapters[i].chapterTotalMin;
            let sec = +chapters[i].chapterTotalSec;

            if (sec >= 60) {
                min += ~~(sec / 60);
                sec = sec % 60;
            }

            if (min >= 60) {
                hour += ~~(min / 60);
                min = min % 60;
            }

            totalHour += hour;
            totalMin += min;
            totalSec += sec;

            const formatedSec = sec > 9 ? sec : `0${sec}`;
            const formatedMin = min > 9 ? min : `0${min}`;
            const duration = `${hour}h:${formatedMin}m:${formatedSec}s`;

            const item = {
                ...chapters[i],
                duration,
            };
            const units = await unitModel.getAllUnitByChapterID(item.chapterID);
            for (let i = 0; i < units.length; i++) {
                const formatedSec =
                    units[i].duration_sec > 9 ?
                    units[i].duration_sec :
                    `0${units[i].duration_sec}`;
                const formatedMin =
                    units[i].duration_min > 9 ?
                    units[i].duration_min :
                    `0${units[i].duration_min}`;
                const duration = `${units[i].duration_hour}h:${formatedMin}m:${formatedSec}s`;
                const unitItem = {
                    ...units[i],
                    duration,
                };
                unitsOfCourse.push(unitItem);
            }
            chaptersOfCourse.push(item);
        }

        let totalChapter = chaptersOfCourse.length;

        if (totalSec >= 60) {
            totalMin += ~~(totalSec / 60);
            totalSec = totalSec % 60;
        }

        if (totalMin >= 60) {
            totalHour += ~~(totalMin / 60);
            totalMin = totalMin % 60;
        }

        const formatedMin = totalMin > 9 ? totalMin : `0${totalMin}`;
        const formatedSec = totalSec > 9 ? totalSec : `0${totalSec}`;
        const duration = `${totalHour}h:${formatedMin}m:${formatedSec}s`;
        // console.log(totalChapter);
        // console.log(totalUnit);
        // console.log(duration);
        const _firstPreviewVideoLink = await unitModel.getFirstPreviewVideoOfCourse(
            courseID
        );

        const firstPreviewVideoLink =
            _firstPreviewVideoLink.length != 0 ?
            _firstPreviewVideoLink[0].linkVideo :
            "0";

        // console.log("alo alo " + firstPreviewVideoLink);

        const addView = await courseModel.increaseView(course[0]);
        if (addView.affectedRows === 1) {
            res.locals.review = review;
            res.render("vwDetail/detail", {
                layout: "main",
                courseDetail,
                chaptersOfCourse,
                unitsOfCourse,
                fourthRows,
                duration,
                totalChapter,
                totalUnit,
                firstPreviewVideoLink,
            });
            return;
        }
        return res.status(404).json({
            message: "Something when wrong when increase views of this course!",
        });
    },

    getAllCourse: async(req, res) => {
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
        if (
            req.body.searchContentListCourse !== undefined ||
            req.session.searchContentListCourse !== undefined
        ) {
            if (req.body.searchContentListCourse !== undefined) {
                req.session.searchContentListCourse = req.body.searchContentListCourse;
            }
            const courseInCat = await cateModel.allSearchWithDetails(
                req.session.searchContentListCourse
            );
            //console.log(courseInCat);
            const allCourse = await courseModel.getAllSearchCoure(
                req.session.searchContentListCourse
            );

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
                rows = await courseModel.pagiListSearchCoursePrice(
                    req.session.searchContentListCourse,
                    offset,
                    limit
                );
            } else if (sort === "star") {
                rows = await courseModel.pagiListSearchCourseStar(
                    req.session.searchContentListCourse,
                    offset,
                    limit
                );
            } else {
                rows = await courseModel.pagiListSearchCourse(
                    req.session.searchContentListCourse,
                    offset,
                    limit
                );
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

            const fifthRows = [];
            for (let i = 0; i < rows.length; i++) {
                let isBestSeller = false;
                let isNewCourse = false;

                if (
                    (await bestSeller()).find(
                        (element) => element.courseID == rows[i].courseID
                    ) !== undefined
                ) {
                    isBestSeller = true;
                }

                if (
                    (await newCourse()).find(
                        (element) => element.courseID == rows[i].courseID
                    ) !== undefined
                ) {
                    isNewCourse = true;
                }
                const item = {
                    ...fourthRows[i],
                    isBestSeller,
                    isNewCourse,
                };
                fifthRows.push(item);
            }
            // console.log(fourthRows);

            const webCat = await cateModel.getWebCatWithCountCourse();
            const mobiCat = await cateModel.getWebCatWithCountCourse();

            // active cat
            for (let i of webCat) {
                if (i.catID === +req.params.id) {
                    i.isActive = true;
                }
            }

            for (let e of mobiCat) {
                if (e.catID === +req.params.id) {
                    e.isActive = true;
                }
            }

            res.render("vwMain/ListCourses", {
                layout: "main",
                courseInCat: courseInCat,
                webCat,
                mobiCat,
                allCourse: fifthRows,
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
            res.redirect("/course-list");
        }
    },

    getLearnCoure: async(req, res) => {
        const courseID = +req.params.id;
        if (res.locals.authUser !== null && res.locals.authUser !== undefined) {
            const isOrdered =
                (
                    await courseModel.getOrderCourseByUserIDAndCourseID(
                        courseID,
                        res.locals.authUser.userID
                    )
                ).length === 1;
            if (isOrdered === true) {
                const course = await courseModel.getCourseByID(courseID);
                course[0].views += 1;
                const type = await courseModel.getTypeOfCourse(
                    courseID,
                    course[0].catID
                );
                const instructor = await courseModel.getInstructor(
                    courseID,
                    course[0].userID
                );
                const catName = await courseModel.getCatName(courseID);
                const avgRating = await courseModel.getAveRatingCourse(courseID);
                const reviewNumb = await courseModel.getReviewCourseNumb(courseID);
                const studentNumb = await courseModel.getCourseBoughtNumb(courseID);
                const chapters = await courseModel.getCourseChapters(courseID);
                const units = await courseModel.getCourseUnits(courseID);
                const lastUpdateTime = course[0].lastUpdate.toISOString().slice(0, 10);
                const review = await reviewModel.getReview(courseID);
                const hasReviewed =
                    (
                        await reviewModel.getReviewByCourseIDandUserID(
                            courseID,
                            res.locals.authUser.userID
                        )
                    ).length !== 1;
                let isExistedWatchlist = true;
                if (
                    res.locals.authUser !== null &&
                    res.locals.authUser.userID !== undefined
                ) {
                    const course = await watchlistModel.getCourseByCourseIDAndUserID(
                        courseID,
                        res.locals.authUser.userID
                    );
                    isExistedWatchlist = course.length === 1;
                }
                console.log(isExistedWatchlist);

                courseDetail = {
                    lastUpdateTime,
                    ...course[0],
                    ...type[0],
                    ...instructor[0],
                    ...catName[0],
                    avgRating: avgRating[0]["round(sum(rating)/count(*),2)"],
                    reviewNumb: reviewNumb[0]["count(*)"],
                    student: studentNumb[0]["count(*)"],
                    review: review,
                    reviewEmpty: review.length === 0,
                    isExistedWatchlist,
                    hasReviewed,
                };
                console.log(courseDetail);

                const chaptersOfCourse = [];
                for (let i = 0; i < chapters.length; i++) {
                    const item = {
                        ...chapters[i],
                    };
                    chaptersOfCourse.push(item);
                }

                const unitsOfCourse = [];
                for (let i = 0; i < units.length; i++) {
                    const item = {
                        ...units[i],
                    };
                    unitsOfCourse.push(item);
                }

                //  console.log(chaptersOfCourse);
                //   console.log(unitsOfCourse);
                const _firstVideoLink = await unitModel.getFirstVideoOfCourse(
                    courseID
                );
                console.log(courseDetail);
                // const addView = await courseModel.increaseView(course[0]);
                // if (addView.affectedRows === 1) {
                res.render("vwLearn/learn", {
                    layout: "main",
                    courseDetail,
                    chaptersOfCourse,
                    unitsOfCourse,
                    _firstVideoLink
                });
            } else {
                res.redirect("/account/purchased-course");
            }
        } else {
            res.redirect("/");
        }
    },
};

module.exports = mainController;