module.exports = function auth(req, res, next) {
  //console.log(req.headers.referer);
  //console.log(req.originalUrl);

  if (req.session.isAuth === false) {
    // req.session.retUrl = req.originalUrl;
    return res.redirect("/user/login");
  }
  next();
};
