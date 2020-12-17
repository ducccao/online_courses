const express = require("express");
const expressHandleBars = require("express-handlebars");
const handlebars = require("handlebars");
const expressHandlebarsSections = require("express-handlebars-sections");
const numeral = require("numeral");

// thằng cha này cân hếch try catch
require("express-async-errors");

const app = express();

handlebars.registerHelper({
  eq: function (v1, v2) {
    return v1 === v2;
  },
  ne: function (v1, v2) {
    return v1 !== v2;
  },
  lt: function (v1, v2) {
    return v1 < v2;
  },
  gt: function (v1, v2) {
    return v1 > v2;
  },
  lte: function (v1, v2) {
    return v1 <= v2;
  },
  gte: function (v1, v2) {
    return v1 >= v2;
  },
  and: function () {
    return Array.prototype.slice.call(arguments).every(Boolean);
  },
  or: function () {
    return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
  },
});

handlebars.registerHelper("if_equal", function (a, b, opts) {
  if (a == b) {
    return opts.fn(this);
  } else {
    return opts.inverse(this);
  }
});

// middle ware
app.use(
  express.urlencoded({
    extended: true,
  })
);

// engine
app.engine(
  "hbs",
  expressHandleBars({
    defaultLayout: "main.hbs",
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

// middle ware
require("./middlewares/locals.mdw")(app);

// Assets
app.use("/vendor", express.static("vendor"));
app.use("/utils", express.static("./utils"));

// routers
app.use("/admin", require("./routers/admin.router"));
app.use("/user", require("./routers/user.router"));

// app.use(express.static("client"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  res.render("about");
});

// catching all error access denied
app.use((err, req, res, next) => {
  if (err.message === "access denied") {
    res.status(403);
    res.json({ error: err.message });
  }

  next(err);
});

app.get("*", (req, res) => {
  res.render("404", {
    layout: false,
    partials: false,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is start at ", PORT);
});
