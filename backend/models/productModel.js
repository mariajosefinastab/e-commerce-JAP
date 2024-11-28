
const fs = require("fs").promises;
const path = require("path");
const productsPath = path.join(__dirname, "../emercado-api-main/products"); 

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

module.exports = {
  getProducts
};