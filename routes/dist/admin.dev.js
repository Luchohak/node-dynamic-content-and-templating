"use strict";

var express = require("express");

var router = express.Router();

var productsController = require('../controllers/products');

router.get("/add-product", productsController.getAddProduct);
router.post("/add-product", productsController.postAddProduct);
module.exports = router;