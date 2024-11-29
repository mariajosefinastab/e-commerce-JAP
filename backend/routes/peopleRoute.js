const express = require("express");
const router = express.Router();

// Ruta protegida de ejemplo
router.get("/", (req, res) => {
  res.json({ message: "Accediste a la ruta protegida /people" });
});

module.exports = router;
