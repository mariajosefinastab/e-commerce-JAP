const express = require("express");
const productRouter = express.Router();
const productController = require("../controller/productController");

productRouter.get("/:id", productController.getProducts);

module.exports = productRouter;
