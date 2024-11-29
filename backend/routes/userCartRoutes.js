const express = require("express");
const router = express.Router();
const userCartController = require("../controllers/userCartController");

router.get("/", userCartController.listUserCarts);
router.get("/:id", userCartController.getUserCart);

module.exports = router;