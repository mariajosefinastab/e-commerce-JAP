const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

// Ruta para obtener datos de venta por ID
router.get("/:id", (req, res) => {
  const sellId = req.params.id;
  const filePath = path.join(__dirname, `../data/sell/${sellId}.json`);

  // Verifica si el archivo existe
  if (fs.existsSync(filePath)) {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return res.status(500).json({ error: "Error al leer el archivo" });
      }
      res.json(JSON.parse(data));
    });
  } else {
    res.status(404).json({ error: "Datos de venta no encontrados" });
  }
});

module.exports = router;