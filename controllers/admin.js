const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

exports.getEditProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Edit Product",
    path: "/admin/edit-product",
    activeEditProduct: true,
  });
};

exports.getProducts = (req, res, next) => {
  res.render("admin/products", {
    pageTitle: "Admin Products",
    path: "/admin/products",
    activeAdminProducts: true,
  });
};
