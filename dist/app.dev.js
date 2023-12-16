"use strict";

var path = require("path");

var express = require("express");

var bodyParser = require("body-parser");

var expressHbs = require("express-handlebars");

var Product = require("./models/product");

var User = require("./models/user");

var Cart = require("./models/cart");

var CartItem = require("./models/cart-item");

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
app.use(function (req, res, next) {
  User.findByPk(1).then(function (user) {
    //This will not store a JS Object, instead it is a Sequelize Object that will contain all its utility methods  
    req.user = user;
    next();
  })["catch"](function (err) {
    return console.log(err);
  });
});
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);
Product.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE"
}); //would be the same as...

User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {
  through: CartItem
});
Product.belongsToMany(Cart, {
  through: CartItem
});
Cart.hasMany(CartItem);
sequelize.sync({
  force: true
}) //.sync()
.then(function (result) {
  return User.findByPk(1); //console.log(result);
}).then(function (user) {
  if (!user) {
    return User.create({
      name: "Lucho",
      email: "test@test.com"
    });
  }

  return user;
}).then(function (user) {
  //console.log(user);
  app.listen(3000);
})["catch"](function (err) {
  console.log(err);
});