const express = require("express");
const expressHandleBars = require("express-handlebars");
const categoryModel = require("./models/category.model");
const numeral = require("numeral");

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
        helpers: {
            // try to using numeral.js right there
            format(val) {
                //   console.log(val);
                return numeral(val).format("0,0");
            },
        },
    })
);
app.set("view engine", "hbs");

app.use("/public", express.static("public"));

// load category before do something else
// tai sao main.hbs nhan duoc lcCategories
app.use(require("./middlewares/locals.mdw"));

// routers
app.use("/admin/categories", require("./routers/category.router"));
app.use("/admin/products", require("./routers/product.router"));
app.use("/products", require("./routers/front/product.route.js"));

//app.use(express.static("client"));

app.get("/", (req, res) => {
    console.log(res.locals.lcCategories);
    res.render("home");
});

app.get("/about", (req, res) => {
    res.render("about");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is start at ", PORT);
});