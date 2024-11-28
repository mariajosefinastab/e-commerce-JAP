const categoriesModel = require("../models/categoriesModel");


const getCategories = async (req, res) => {
  const categories = await categoriesModel.getCategories();
  res.json(categories);
};


module.exports = {
    getCategories
  };


