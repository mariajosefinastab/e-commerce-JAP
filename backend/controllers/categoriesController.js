const categoriesModel = require("../models/categoriesModel");

const listCategories = (req, res) => {
  try {
    const categories = categoriesModel.listCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error al listar categorías" });
  }
};

const getCategory = (req, res) => {
  const { id } = req.params;
  try {
    const category = categoriesModel.getCategory(id);
    res.json(category);
  } catch (error) {
    res.status(404).json({ message: "Categoría no encontrada" });
  }
};

module.exports = { listCategories, getCategory };

