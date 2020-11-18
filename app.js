const express = require("express");
const expressHandleBars = require("express-handlebars");

const app = express();

app.use(express.static("client"));

app.get("/", (req, res) => {
  res.end("Hi world!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is start at ", PORT);
});
