"use strict";

var Product = require("../models/product");

var Cart = require("../models/cart");

exports.getIndex = function (req, res, next) {
  Product.findAll().then(function (products) {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/"
    });
  })["catch"](function (err) {
    console.log(err);
  });
};

exports.getProducts = function (req, res, next) {
  Product.findAll().then(function (products) {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "Products",
      path: "/products"
    });
  })["catch"](function (err) {
    console.log(err);
  });
};

exports.getProduct = function (req, res, next) {
  var prodId = req.params.productId; // Product.findAll({ where: { id: prodId } }).then(products => {
  //   res.render("shop/product-detail", {
  //     pageTitle: products[0].title,
  //     path: "/products",
  //     product: products[0],
  //   });
  // }).catch(err => {console.log(err)});

  Product.findByPk(prodId).then(function (product) {
    res.render("shop/product-detail", {
      pageTitle: product,
      path: "/products",
      product: product
    });
  })["catch"](function (err) {
    console.log(err);
  });
};

exports.getCart = function (req, res, next) {
  req.user.getCart().then(function (cart) {
    return cart.getProducts().then(function (products) {
      res.render("shop/cart", {
        pageTitle: "Cart",
        path: "/cart",
        products: products
      });
    })["catch"]();
  })["catch"](function (err) {
    return console.log(err);
  });
};

exports.postCart = function (req, res, next) {
  var prodId = req.body.productId;
  var fetchedCart;
  req.user.getCart().then(function (cart) {
    fetchedCart = cart;
    return cart.getProducts({
      where: {
        id: prodId
      }
    });
  }).then(function (products) {
    var product;

    if (products.length > 0) {
      product = products[0];
    }

    var newQuantity = 1;

    if (product) {//...
    }

    return Product.findByPk(prodId).then(function (product) {
      return fetchedCart.addProduct(product, {
        through: {
          quantity: newQuantity
        }
      });
    })["catch"](function (err) {
      return console.log(err);
    });
  }).then(function () {
    res.redirect('/cart');
  })["catch"](function (err) {
    return console.log(err);
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