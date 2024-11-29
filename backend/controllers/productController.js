const { listJsonFiles, getJsonFromFile } = require("../models/jsonModel");

const listProducts = (req, res) => {
  try {
    const files = listJsonFiles("products");
    res.json({ availableFiles: files });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProduct = (req, res) => {
  const { id } = req.params;
  try {
    const product = getJsonFromFile("products", `${id}.json`);
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { listProducts, getProduct };
/* const productsModel = require("../models/productModel");


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
  }; */


