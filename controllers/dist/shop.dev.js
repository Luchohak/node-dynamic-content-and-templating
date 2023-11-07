"use strict";

var Product = require("../models/product");

exports.getIndex = function (req, res, next) {
  Product.fetchAll(function (products) {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  });
};

exports.getProducts = function (req, res, next) {
  Product.fetchAll(function (products) {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "Products",
      path: "/products",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  });
};

exports.getCart = function (req, res, next) {
  res.render("shop/cart", {
    pageTitle: "Cart",
    path: "/cart"
  });
};

exports.getCheckout = function (req, res, next) {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout"
  });
};