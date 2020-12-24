function auth(req, res, next) {
  //console.log(req.headers.referer);
  //console.log(req.originalUrl);

  if (req.session.isAuth === false) {
    // req.session.retUrl = req.originalUrl;
    return res.redirect("/user/login");
  }
  next();
}

function authAdmin(req, res, next) {
  console.log(req.session);

  if (req.session.authUser === null && req.session.isAuth === false) {
    return res.redirect("/user/login");
  }

  if (req.session.authUser.decentralization !== 2) {
    return res
      .status(404)
      .json({ message: "Only Admin Can Access This Page!" });
  }
  next();
}

module.exports = {
  auth,
  authAdmin,
};
