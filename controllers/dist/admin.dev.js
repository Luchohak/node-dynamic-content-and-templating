"use strict";

var Product = require("../models/product");

exports.getAddProduct = function (req, res, next) {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false
  });
};

exports.postAddProduct = function (req, res, next) {
  var title = req.body.title;
  var imageUrl = req.body.imageUrl;
  var price = req.body.price;
  var description = req.body.description;
  Product.create({
    title: title,
    imageUrl: imageUrl,
    price: price,
    description: description
  }).then(function (result) {
    console.log(result);
  })["catch"](function (err) {
    console.log(err);
  });
};

exports.getEditProduct = function (req, res, next) {
  var editMode = req.query.edit;

  if (!editMode) {
    return res.redirect("/");
  }

  var prodId = req.params.productId;
  Product.findByPk(prodId).then(function (product) {
    if (!product) {
      return res.redirect("/");
    }

    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product
    });
  })["catch"](function (err) {
    console.log(err);
  });
};

exports.postEditProduct = function (req, res, next) {
  var prodId = req.body.productId;
  var updatedTitle = req.body.title;
  var updatedPrice = req.body.price;
  var updatedImageUrl = req.body.imageUrl;
  var updatedDescription = req.body.description;
  Product.findByPk(prodId).then(function (product) {
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.description = updatedDescription;
    product.imageUrl = updatedImageUrl;
    return product.save();
  }).then(function (result) {
    console.log("UPDATED PRODUCT");
    res.redirect("/admin/products");
  })["catch"](function (err) {
    console.log(err);
  });
};

exports.getProducts = function (req, res, next) {
  Product.findAll().then(function (products) {
    res.render("admin/products", {
      pageTitle: "Admin Products",
      path: "/admin/products",
      prods: products,
      activeAdminProducts: true
    });
  })["catch"](function (err) {
    console.log(err);
  });
};

exports.postDeleteProduct = function (req, res, next) {
  var prodId = req.body.productId;
  Product.findByPk(prodId).then(function (product) {
    return product.destroy();
  }).then(function (result) {
    console.log("PRODUCT DELETED");
    res.redirect("/admin/products");
  })["catch"](function (err) {
    console.log(err);
  });
};