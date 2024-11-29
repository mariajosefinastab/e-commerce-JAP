const { listJsonFiles, getJsonFromFile } = require("../models/jsonModel");

const listProductsComments = (req, res) => {
  try {
    const files = listJsonFiles("products_comments");
    res.json({ availableFiles: files });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductComment = (req, res) => {
  const { id } = req.params;
  try {
    const productComment = getJsonFromFile("products_comments", `${id}.json`);
    res.json(productComment);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { listProductsComments, getProductComment };