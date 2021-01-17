const userModel = require("./../models/user.model");

function authNav(req, res, next) {
    if (typeof req.session.authUser === "undefined") {
        res.locals.isAdmin = false;
        res.locals.isInstructor = false;
    } else {
        if (req.session.authUser !== null) {
            if (req.session.authUser.decentralization === 2) {
                res.locals.isAdmin = true;
            } else if (req.session.authUser.decentralization === 1) {
                res.locals.isInstructor = true;
            } else {
                res.locals.isInstructor = false;
                res.locals.isAdmin = false;
            }
        }
    }
    //console.log(res.locals.isAdmin);
    //console.log(res.locals.isInstructor);
    next();
}

function auth(req, res, next) {
    //  console.log(req.session);
    if (typeof req.session === "undefined") {
        throw new Error("Session is undefined!");
    }
    //console.log(req.headers.referer);
    //console.log(req.originalUrl);

    if (req.session.isAuth === false) {
        // req.session.retUrl = req.originalUrl;
        return res.redirect("/user/login");
        //  return res.status(200).json({ url: `/user/login` });
    }
    next();
}

function authAdmin(req, res, next) {
    // console.log(req.session);

    if (req.session.authUser === null && req.session.isAuth === false) {
        return res.redirect("/user/login");
    }

    // console.log(req.session.authUser);
    if (typeof req.session.authUser === "undefined") {
        return res.redirect("/");
    }

    if (req.session.authUser.decentralization !== 2) {
        return res.redirect("/");
    }

    next();
}

async function authOTP(req, res, next) {
    const userSession = req.session.authUser;
    console.log(req.session.authUser);

    if (req.session.authUser === null) {
        const url = req.headers.referer;
        return next();
    }

    const user = await userModel.getUserByID(userSession.userID);
    // console.log(user);

    // lock account
    if (user[0].verify === 2) {
        return res.redirect("/user/locked");
    }

    if (user[0].verify !== 1) {
        return res.redirect("/user/prevent-access");
    }

    next();
}

module.exports = {
    auth,
    authAdmin,
    authNav,
    authOTP,
};