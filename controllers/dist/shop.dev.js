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
  Cart.getCart(function (cart) {
    Product.fetchAll(function (products) {
      var cartProducts = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = products[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          product = _step.value;
          var cartProductData = cart.products.find(function (prod) {
            return prod.id === product.id;
          });

          if (cartProductData) {
            cartProducts.push({
              productData: product,
              qty: cartProductData.qty
            });
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      res.render("shop/cart", {
        pageTitle: "Cart",
        path: "/cart",
        products: cartProducts
      });
    });
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

exports.postCartDeleteProduct = function (req, res, next) {
  var prodId = req.body.productId;
  Product.findById(prodId, function (product) {
    Cart.deleteProduct(prodId, product.price);
    res.redirect("/cart");
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