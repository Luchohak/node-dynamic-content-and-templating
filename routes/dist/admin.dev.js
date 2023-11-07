"use strict";

var express = require("express");

var router = express.Router();

var adminController = require('../controllers/admin');

router.get("/add-product", adminController.getAddProduct);
router.post("/add-product", adminController.postAddProduct);
router.get("/products", adminController.getProducts);
module.exports = router;