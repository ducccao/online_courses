const moment = require("moment");
const accountModel = require('../models/account.model');
const bcryptjs = require("bcryptjs");
module.exports = {
    getProfile: (req, res) => {
        console.log("get Profile");
        if (req.session.isAuth === true) {
            console.log(req.session.isAuth);
            console.log(req.session.authUser);
            res.render("vwAccount/profile", {
                layout: "account",
            })
        } else {
            console.log(req.session.isAuth);
            console.log(req.session.user);
            throw Error("access denied");
        }
    },
    getChangePass: (req, res) => {
        console.log("get change pass")
        if (req.session.isAuth === true) {
            res.render("vwAccount/changePass", {
                layout: "account",
                session: req.session
            })
        } else {
            throw Error("access denied");
        }
    },
    getPhoto: (req, res) => {
        if (req.session.isAuth === true) {
            res.render("vwAccount/photo", {
                layout: "account"
            })
        } else {
            throw Error("access denied");
        }

    },
    postProfile: async(req, res) => {
        if (req.session.isAuth === true) {
            try {
                console.log("updating profile!");
                const { username, email, dob } = req.body
                    //  console.log(req.body);

                // format date - yyyy-mth-day
                const dobFormated = moment(dob, "DD/MM/YYYY").format("YYYY-MM-DD");

                const user = {
                    userName: username,
                    DOB: dobFormated,
                };
                console.log(user);

                const condition = { email: email }

                const result = await accountModel.updateProfile(user, condition)

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


        res.redirect('../user/login');
    },

    postChangePass: async(req, res) => {
        if (req.session.isAuth === true) {
            try {
                console.log("updating password!");
                const { oldPass, newPass } = req.body
                    //  console.log(req.body);

                const hash = bcryptjs.hashSync(newPass, 10);
                const user = {
                    password: hash
                };

                const comparePassword = bcryptjs.compareSync(
                    oldPass,
                    req.session.authUser.password
                );
                console.log(comparePassword);
                if (comparePassword === false) {
                    return res.status(404).json({ message: "Invalid email or password!" });
                } else {
                    const condition = { email: req.session.authUser.email }
                    console.log(condition);
                    const result = await accountModel.updatePassword(user, condition);

                    req.session.authUser.password = hash
                }


                res.end();

            } catch (er) {
                // console.log(er);
                return res.status(404).json({ message: er.sqlMessage });
            }
        } else {
            throw Error("access denied");
        }

    },
}