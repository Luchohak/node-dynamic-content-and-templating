"use strict";

var path = require("path");

var express = require("express");

var bodyParser = require("body-parser");

var expressHbs = require("express-handlebars");

var app = express();
app.engine("handlebars", expressHbs({
  layoutsDir: "views/layouts",
  defaultLayout: "main-layout"
}));
app.set("view engine", "ejs");
app.set("views", "views");

var adminRoutes = require("./routes/admin");

var shopRoutes = require("./routes/shop");

var errorController = require("./controllers/error");

var sequelize = require("./util/database");

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express["static"](path.join(__dirname, "public")));
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);
sequelize.sync().then(function (result) {
  //console.log(result);
  app.listen(3000);
})["catch"](function (err) {
  console.log(err);
});