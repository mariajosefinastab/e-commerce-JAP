const express = require("express");
const fs = require("fs");
const router = express.Router();

router.get("/", (req, res) => {
  fs.readFile("./data/cats/cat.json", "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Error al leer el archivo" });
    res.json(JSON.parse(data));
  });
});

module.exports = router;