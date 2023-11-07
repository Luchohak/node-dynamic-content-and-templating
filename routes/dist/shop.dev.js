"use strict";

var path = require("path");

var express = require("express");

var productsController = require('../controllers/shop');

var router = express.Router();
router.get("/", productsController.getShop);
router.get("/products", productsController.getProducts);
router.get("/cart", productsController.getCart);
module.exports = router;