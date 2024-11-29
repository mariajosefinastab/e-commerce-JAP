const express = require("express");
const productRouter = express.Router();
const productController = require("../controller/productController");

//Obtiene producto
productRouter.get("/:id", productController.getProducts);
//Obtiene lista de productos por categoria
productRouter.get("/catproducts/:id", productController.getCatProducts);
//Obtiene comentarios del producto.
productRouter.get("/commentproducts/:id", productController.getComProducts);


module.exports = productRouter;
