const express = require("express");

module.exports = function (app) {
  // Assets
  app.use("/vendor", express.static("vendor"));
  app.use("/utils", express.static("./utils"));
  app.use("/public", express.static("public"));
};
