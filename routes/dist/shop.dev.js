"use strict";

var path = require("path");

var express = require("express");

var rootDir = require("../util/path");

var adminData = require("./admin");

var router = express.Router();
router.get("/", function (req, res, next) {
  var products = adminData.products;
  res.render("shop", {
    prods: products,
    pageTitle: 'Shop',
    path: '/'
  });
});
module.exports = router;