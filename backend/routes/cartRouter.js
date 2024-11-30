const express = require("express");
const cartRouter = express.Router();
const cartController = require("../controller/cartController");

//obtiene carrito
cartRouter.get("/", cartController.getCart);

//guarda producto
cartRouter.post("/", cartController.setCart);

//suma unidad
//cartRouter.post("/:id", cartController.setCartId);

//elimina unidad
cartRouter.delete("/:id", cartController.deleteCartId);


module.exports = cartRouter;