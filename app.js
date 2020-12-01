const express = require("express");
const expressHandleBars = require("express-handlebars");

// thằng cha này cân hếch try catch
require("express-async-errors");

const app = express();

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
  })
);
app.set("view engine", "hbs");
// routers
app.use("/admin/categories", require("./routers/category.router"));
app.use("/admin/products", require("./routers/product.router"));

app.use(express.static("client"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  res.render("about");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is start at ", PORT);
});
