const express = require("express");
const router = express.Router();
const productsCommentsController = require("../controllers/productsCommentsController");

router.get("/", productsCommentsController.listComments);  
router.get("/:id", productsCommentsController.getComment);  
module.exports = router;