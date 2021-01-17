const adminModel = require("./../models/admin.model");
const usersDatabase = require("./../utils/usersDatabase");
const categoryModel = require("./../models/category.model");
const courseModel = require("./../models/course.model");
const {
    averageArrayRating,
    calDiscountedFree,
} = require("./../utils/utilsFunction");

const homeController = {
    getListCourses: async(req, res) => {
        console.log("List Course Paginating 1234!!");
        const _ListMostViews = await courseModel.getMostViews();

        const ListMostViews = await getAllDetail(_ListMostViews);

        const _listFourHightllightCoursesOfWeek = await courseModel.getTopFourHightllightCoursesOfWeek();

        const listFourHightllightCoursesOfWeek = await getAllDetail(
            _listFourHightllightCoursesOfWeek
        );

        const _listTopTenNewestOfWeek = await courseModel.getTopTenNewestOfWeek();

        const listTopTenNewestOfWeek = await getAllDetail(_listTopTenNewestOfWeek);

        const _listTop5MostSubcribeOfWeek = await courseModel.getTopTenMostSubcribeOfWeek();

        const fiveCatRet1 = [];

        for (let i = 0; i < _listTop5MostSubcribeOfWeek.length; ++i) {
            const detailCat = await categoryModel.getCateByID(
                _listTop5MostSubcribeOfWeek[i].catID
            );
            //   console.log("Detail cat ", detailCat);
            fiveCatRet1.push({
                ...detailCat[0],
                numb: _listTop5MostSubcribeOfWeek[i].numb,
            });
        }

        console.log(fiveCatRet1);
        // console.log(_listTopTenMostSubcribeOfWeek);

        // const mostBuyWeekCourse = await test(mostBuyWeek);getTopTenNewestOfWeek

        // const rows = await courseModel.all();

        // const allCourse = await test(rows);

        res.render("vwMain/Home", {
            layout: "mainHome",
            // allCourse,
            ListMostViews,
            listFourHightllightCoursesOfWeek,
            listTopTenNewestOfWeek,
            fiveCatRet1,
        });
    },
};

async function getAllDetail(rows) {
    //get cateType, add all in prev and cateType to nextRows array
    const nextRows = [];

    for (let i = 0; i < rows.length; i++) {
        //get cateID of course
        const subjID = await courseModel.getTypeOfCourse(
            rows[i].courseID,
            rows[i].catID
        );

        const catName = await courseModel.getCatName(rows[i].courseID);

        const item = {
            ...rows[i],
            subjID: subjID.length !== 0 ? subjID[0].subjID : 0,
            catName: catName.length !== 0 ? catName[0].catName : "Unknown",
        };
        nextRows.push(item);
    }
    //  console.log(rows);
    // const typeOfCourse = await courseModel.getTypeOfCourse(1, 1);
    // console.log(nextRows);

    //get instructor, add all in prev and instructor to thirdRows array
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
    //get average rating, discount of course, add all in prev, rating and discount to fourthRows array
    const fourthRows = [];
    for (let i = 0; i < thirdRows.length; i++) {
        // console.log("this is: " + thirdRows[i].courseID);
        //get all rating
        const ratingArray = await courseModel.getRatingCourse(
            thirdRows[i].courseID
        );
        //calculate averageRating
        const averageRating = averageArrayRating(ratingArray);
        //   console.log(averageRating);
        //get discount of course
        const discount = await courseModel.getDiscountCourse(thirdRows[i].courseID);

        const discou = discount.length !== 0 ? discount[0].percent : 0;

        const discountedPrice = calDiscountedFree(+thirdRows[i].fee, discou);

        const item = {
            ...thirdRows[i],
            rating: typeof + averageRating === "number" ? averageRating : 0,
            countPeopleRating: ratingArray.length,
            discount: discou,
            discountedPrice,
        };
        fourthRows.push(item);
    }
    // console.log(fourthRows);
    return fourthRows;
}

module.exports = homeController;