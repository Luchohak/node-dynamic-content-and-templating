"use strict";

var Product = require("../models/product");

var Cart = require("../models/cart");

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

exports.getProduct = function (req, res, next) {
  var prodId = req.params.productId;
  Product.findById(prodId, function (product) {
    console.log(product);
    res.render("shop/product-detail", {
      pageTitle: product.title,
      path: "/products",
      product: product
    });
  });
};

exports.getCart = function (req, res, next) {
  res.render("shop/cart", {
    pageTitle: "Cart",
    path: "/cart"
  });
};

exports.postCart = function (req, res, next) {
  var prodId = req.body.productId;
  Product.findById(prodId, function (product) {
    Cart.addProduct(prodId, product.price);
  });
  res.render("shop/cart", {
    pageTitle: "Cart",
    path: "/cart"
  });
};

exports.getOrders = function (req, res, next) {
  res.render("shop/orders", {
    pageTitle: "Orders",
    path: "/orders"
  });
};

exports.getCheckout = function (req, res, next) {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout"
  });
};