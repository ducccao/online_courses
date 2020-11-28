const express = require("express");
const expressHandleBars = require("express-handlebars");
// thằng cha này cân hếch try catch
require("express-async-errors");

const app = express();

app.engine(
  "hbs",
  expressHandleBars({
    defaultLayout: "main.hbs",
    extname: ".hbs",
    layoutsDir: "views/_layouts",
    partialsDir: "views/_partials",
  })
);

app.use(express.static("client"));

app.get("/", (req, res) => {
  res.end("Hi world!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is start at ", PORT);
});
