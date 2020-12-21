module.exports = function (app) {
  // catching all error access denied
  app.use((err, req, res, next) => {
    if (err.message === "access denied") {
      res.status(403);
      res.json({ error: err.message });
    }

    next(err);
  });

  app.get("*", (req, res) => {
    const url = req.headers.referer;
    res.render("404", {
      layout: false,
      partials: false,
      backURL: url,
    });
  });
};
