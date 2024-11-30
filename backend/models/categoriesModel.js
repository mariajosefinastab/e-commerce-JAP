const fs = require("fs").promises;
const path = require("path");
const categoriesPath = path.join(__dirname, "../emercado-api-main/cats/cat.json");

const getCategories = async () => {
  try {
    const data = await fs.readFile(categoriesPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error al leer el archivo JSON:", error);
    return false;
  }
};

module.exports = {
  getCategories
};


