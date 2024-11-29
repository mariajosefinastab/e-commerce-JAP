const { listJsonFiles, getJsonFromFile } = require("../models/jsonModel");

const listCatsProducts = (req, res) => {
  try {
    const files = listJsonFiles("cats_products");
    res.json({ availableFiles: files });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCatProduct = (req, res) => {
  const { id } = req.params;
  try {
    const catProduct = getJsonFromFile("cats_products", `${id}.json`);
    res.json(catProduct);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { listCatsProducts, getCatProduct };