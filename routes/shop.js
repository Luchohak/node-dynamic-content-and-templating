const path = require("path");

const express = require("express");

const productsController = require('../controllers/shop');

const router = express.Router();

router.get("/", productsController.getShop);
router.get("/products", productsController.getProducts);
router.get("/cart", productsController.getCart);


module.exports = router;
