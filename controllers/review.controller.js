const reviewModel = require("../models/review.model");
const rviewModel = require("../models/review.model");

module.exports = {
    addReview: async(req, res) => {
        const entity = {
            courseID: req.body.courseID,
            userID: res.locals.authUser.userID,
            rating: req.body.rating,
            content: req.body.content,
        }
        const check = (await reviewModel.getReviewByCourseIDandUserID(entity.courseID, entity.userID)).length === 1;
        console.log(check);
        if (check === false) {
            reviewModel.addReview(entity);
            res.redirect(`/course/learn/${entity.courseID}`)
        }
        res.redirect(`/course/learn/${entity.courseID}`)
        console.log(entity);
    }
}