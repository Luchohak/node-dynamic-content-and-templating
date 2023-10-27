"use strict";

var path = require('path');

var express = require("express");

var bodyParser = require("body-parser");

var expressHbs = require("express-handlebars");

var app = express();
app.engine('handlebars', expressHbs({
  layoutsDir: 'views/layouts',
  defaultLayout: 'main-layout'
}));
app.set('view engine', 'handlebars');
app.set('views', 'views');

var adminData = require("./routes/admin");

var shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express["static"](path.join(__dirname, 'public')));
app.use('/admin', adminData.routes);
app.use(shopRoutes);
app.use(function (req, res, next) {
  res.status(404).render('404', {
    pageTitle: 'Page Not Found'
  });
});
app.listen(3000);