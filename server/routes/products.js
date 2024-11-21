const express = require("express");
const { getProductCountsByBrand } = require("../controllers/products");

const productsRoute = express.Router();

productsRoute.get("/product-counts/:brandId", getProductCountsByBrand);

module.exports = productsRoute;