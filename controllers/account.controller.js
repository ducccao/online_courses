const moment = require("moment");
const accountModel = require("../models/account.model");
const bcryptjs = require("bcryptjs");
const cateModel = require("./../models/category.model");
const courseModel = require("./../models/course.model");
const userModel = require("./../models/user.model");
const config = require("./../config/default.json");
const { averageArrayRating } = require("./../utils/utilsFunction");
module.exports = {
    getProfile: (req, res) => {
        console.log("get Profile");
        if (req.session.isAuth === true) {
            res.locals.authUser.DOB = moment().format("DD/MM/YYYY");
            res.render("vwAccount/profile", {
                layout: "account",
            });
        } else {
            throw Error("access denied");
        }
    },
    getChangePass: (req, res) => {
        console.log("get change pass");
        if (req.session.isAuth === true) {
            res.render("vwAccount/changePass", {
                layout: "account",
                session: req.session,
            });
        } else {
            throw Error("access denied");
        }
    },
    getPhoto: (req, res) => {
        if (req.session.isAuth === true) {
            res.render("vwAccount/photo", {
                layout: "account",
            });
        } else {
            throw Error("access denied");
        }
    },
    postProfile: async(req, res) => {
        if (req.session.isAuth === true) {
            try {
                console.log("updating profile!");
                const { username, email, dob } = req.body;
                //  console.log(req.body);

                // format date - yyyy-mth-day
                const dobFormated = moment(dob, "DD/MM/YYYY").format("YYYY-MM-DD");

                const user = {
                    userName: username,
                    DOB: dobFormated,
                };
                console.log(user);

                const condition = { email: email };

                const result = await accountModel.updateProfile(user, condition);

                // req.session.authUser.dob = DOB;
                req.session.authUser.userName = user.userName;

                res.end();
            } catch (er) {
                // console.log(er);
                return res.status(404).json({ message: er.sqlMessage });
            }
        } else {
            throw Error("access denied");
        }
    },
    getLogOut: async(req, res) => {
        req.session.isAuth = false;
        req.session.authUser = null;

        res.redirect("../user/login");
    },

    postChangePass: async(req, res) => {
        if (req.session.isAuth === true) {
            console.log(req.session.authUser);

            if (req.session.authUser.decentralization === 2) {
                const { oldPass, newPass } = req.body;
                if (oldPass === "admin123") {
                    const condition = { email: req.session.authUser.email };
                    //  console.log(condition);
                    const user = {
                        password: newPass,
                    };
                    const result = await accountModel.updatePassword(user, condition);
                    res.status(200).json({ message: "Updated Password!" });
                } else {
                    return res
                        .status(404)
                        .json({ message: "Invalid email or password!" });
                }
            } else {
                try {
                    console.log("updating password!");
                    const { oldPass, newPass } = req.body;
                    //  console.log(req.body);

                    const hash = bcryptjs.hashSync(newPass, 10);
                    const user = {
                        password: hash,
                    };

                    const comparePassword = bcryptjs.compareSync(
                        oldPass,
                        req.session.authUser.password
                    );
                    console.log(comparePassword);
                    if (comparePassword === false) {
                        return res
                            .status(404)
                            .json({ message: "Invalid email or password!" });
                    } else {
                        const condition = { email: req.session.authUser.email };
                        console.log(condition);
                        const result = await accountModel.updatePassword(user, condition);

                        req.session.authUser.password = hash;
                    }

                    res.end();
                } catch (er) {
                    // console.log(er);
                    return res.status(404).json({ message: er.sqlMessage });
                }
            }
        } else {
            throw Error("access denied");
        }
    },

    getInstructorCourse: async(req, res) => {
        const user = req.session.authUser;
        // console.log(user);
        const _isInstructor = user.decentralization == 1 ? 1 : 0;
        // console.log(_isInstructor);

        const purchasedCourse = await accountModel.getInstructorCourse(user.userID);
        //  console.log(purchasedCourse);
        const courseCards = [];
        for (let i = 0; i < purchasedCourse.length; ++i) {
            const item = await courseModel.getCourseByID(purchasedCourse[i].courseID);
            courseCards.push({
                ...item[0],
            });
        }

        res.render("vwAccount/PurchasedCourses", {
            layout: "main",
            _isInstructor,
            courseCards,
            // pagi
            // showPagi: true,
            // pagiItem,
            // can_go_prev: page > 1,
            // can_go_next: page < nPage,
            // go_next_page: page + 1,
            // go_previous_page: page - 1,
        });
    },

    getPurchasedCourses: async(req, res) => {
        const user = req.session.authUser;
        // console.log(user);
        const purchasedCourse = await accountModel.getPurchasedCourses(user.userID);
        //  console.log(purchasedCourse);
        const courseCards = [];
        for (let i = 0; i < purchasedCourse.length; ++i) {
            const item = await courseModel.getCourseByID(purchasedCourse[i].courseID);
            courseCards.push({
                ...item[0],
            });
        }
        // console.log(courseCards);

        // let page = +req.query.page || 1;
        // if (page < 0) {
        //     page = 1;
        // }
        // const limit = config.purchasedCourses.pagination.limit;
        // const offset = (page - 1) * 6;
        // const rows = await courseModel.pagiListCourse(offset, limit);
        // const total = courseCards.length;
        // const nPage = Math.ceil(total / limit);
        // const pagiItem = [];

        // for (let i = 1; i <= nPage; i++) {
        //     const item = {
        //         value: i,
        //         isActive: page === i,
        //     };
        //     pagiItem.push(item);
        // }

        res.render("vwAccount/PurchasedCourses", {
            layout: "main",
            courseCards,
            // pagi
            // showPagi: true,
            // pagiItem,
            // can_go_prev: page > 1,
            // can_go_next: page < nPage,
            // go_next_page: page + 1,
            // go_previous_page: page - 1,
        });
    },
};