const expressHandleBars = require("express-handlebars");
const expressHandlebarsSections = require("express-handlebars-sections");
const numeral = require("numeral");

module.exports = function (app) {
  // engine
  app.engine(
    "hbs",
    expressHandleBars({
      defaultLayout: "mainHome.hbs",
      extname: ".hbs",
      layoutsDir: "views/_layouts",
      partialsDir: "views/_partials",
      helpers: {
        eq: function (v1, v2) {
          return v1 === v2;
        },
        section: expressHandlebarsSections(),
        format(val) {
          return numeral(val).format("0,0");
        },
      },
    })
  );
  app.set("view engine", "hbs");
};
