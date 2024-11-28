const productsModel = require("../models/productModel");


const getProducts = async (req, res) => {
  let id= req.params.id;
  const products = await productsModel.getProducts(id);
  res.json([products]);
  
};


module.exports = {
    getProducts
  };


