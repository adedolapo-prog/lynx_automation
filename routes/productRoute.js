const { Router } = require("express");
const {
  fetchSingleProductController,
  fetchMostViewedProductController,
} = require("../controller/productController.js");
const productRoute = Router();

productRoute.get("/most-viewed", fetchMostViewedProductController);
productRoute.get("/:id", fetchSingleProductController);

module.exports = { productRoute };
