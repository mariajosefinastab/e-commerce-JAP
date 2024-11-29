const { listJsonFiles, getJsonFromFile } = require("../models/jsonModel");

const listSells = (req, res) => {
  try {
    const files = listJsonFiles("sell");
    res.json({ availableFiles: files });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSell = (req, res) => {
  const { id } = req.params;
  try {
    const sell = getJsonFromFile("sell", `${id}.json`);
    res.json(sell);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { listSells, getSell };