const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

// Ruta para obtener comentarios de un producto por ID
router.get("/:id", (req, res) => {
  const productId = req.params.id;
  const filePath = path.join(__dirname, `../data/products_comments/${productId}.json`);

  // Verifica si el archivo existe
  if (fs.existsSync(filePath)) {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return res.status(500).json({ error: "Error al leer el archivo" });
      }
      res.json(JSON.parse(data));
    });
  } else {
    res.status(404).json({ error: "Comentarios no encontrados para este producto" });
  }
});

module.exports = router;