"use strict";

var products = [];

exports.getAddProduct = function (req, res, next) {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    activeAddProduct: true,
    productCSS: true,
    formsCSS: true
  });
};

exports.postAddProduct = function (req, res, next) {
  products.push({
    title: req.body.title
  });
  res.redirect("/");
};

exports.getShop = function (req, res, next) {
  res.render("shop", {
    prods: products,
    pageTitle: "Shop",
    path: "/",
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true
  });
};