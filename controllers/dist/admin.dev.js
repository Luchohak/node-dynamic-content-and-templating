"use strict";

var Product = require("../models/product");

exports.getAddProduct = function (req, res, next) {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    activeAddProduct: true
  });
};

exports.postAddProduct = function (req, res, next) {
  var product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

exports.getEditProduct = function (req, res, next) {
  res.render("admin/edit-product", {
    pageTitle: "Edit Product",
    path: "/admin/edit-product",
    activeEditProduct: true
  });
};

exports.getProducts = function (req, res, next) {
  res.render("admin/products", {
    pageTitle: "Admin Products",
    path: "/admin/products",
    activeAdminProducts: true
  });
};