const express = require("express");
// thằng cha này cân hếch try catch
require("express-async-errors");
require("express-handlebars-sections");

const app = express();

// middle ware
require("./middlewares/hbs.helper.mdw")(app);
require("./middlewares/engine.mdw")(app);
require("./middlewares/session.mdw")(app);
require("./middlewares/locals.mdw")(app);
require("./middlewares/assets.mdw")(app);
require("./middlewares/routes.mdw")(app);
require("./middlewares/barricades.mdw")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running at PORT:",PORT);
});
