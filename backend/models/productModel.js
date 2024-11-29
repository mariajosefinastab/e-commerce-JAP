
const fs = require("fs").promises;
const path = require("path");
const productsPath = path.join(__dirname, "../emercado-api-main/products"); 
const catProductsPath = path.join(__dirname, "../emercado-api-main/cats_products");
const comProductsPath = path.join(__dirname, "../emercado-api-main/products_comments");

const getProducts = async (id) => {
  try {
    
    const data = await fs.readFile(productsPath+"/"+id+".json", "utf8");
    const models = JSON.parse(data);
    return models || false;
  } catch (error) {
    console.error("Error leyendo el archivo", error);
    return false; 
  }
};

const getCatProducts = async (id) => {
  try {
    
    const data = await fs.readFile(catProductsPath+"/"+id+".json", "utf8");
    const models = JSON.parse(data);
    return models || false;
  } catch (error) {
    console.error("Error leyendo el archivo", error);
    return false; 
  }
};

const getComProducts = async (id) => {
  try {
    const data = await fs.readFile(comProductsPath+"/"+id+".json", "utf8");
    const models = JSON.parse(data);
    return models || false;
  } catch (error) {
    console.error("Error leyendo el archivo", error);
    return false; 
  }
};

module.exports = {
  getProducts,getCatProducts, getComProducts
};
