const express = require("express");
const categoriesRouter = express.Router();
const categoriesController = require("../controller/categoriesController");

categoriesRouter.get("/", categoriesController.getCategories);

module.exports = categoriesRouter;
