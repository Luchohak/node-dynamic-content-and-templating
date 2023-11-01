"use strict";

var path = require("path");

var express = require("express");

var productsController = require('../controllers/products');

var router = express.Router();
router.get("/", productsController.getShop);
module.exports = router;