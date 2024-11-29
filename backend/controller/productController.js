const productsModel = require("../models/productModel");


const getProducts = async (req, res) => {
  console.log("getProducts");
  let id= req.params.id;
  const products = await productsModel.getProducts(id);
  res.json([products]);
  
};

const getCatProducts = async (req, res) => {
  console.log("getCatProducts");
  let id= req.params.id;
  const products = await productsModel.getCatProducts(id);
  res.json([products]);
  
};

//obtiene comentarios de producto
const getComProducts = async (req, res) => {
  console.log("getComProducts");
  let id= req.params.id;
  const comments = await productsModel.getComProducts(id);
  res.json([comments]);
  
};
module.exports = {
    getProducts,getCatProducts, getComProducts
  };


