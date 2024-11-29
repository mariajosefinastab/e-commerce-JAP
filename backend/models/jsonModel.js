const fs = require("fs");
const path = require("path");

// Listar todos los archivos JSON en una carpeta
const listJsonFiles = (folder) => {
  const folderPath = path.join(__dirname, "..", folder);
  return fs.readdirSync(folderPath).filter((file) => file.endsWith(".json"));
};

// Leer un archivo JSON desde una carpeta
const getJsonFromFile = (folder, file) => {
  const filePath = path.join(__dirname, "..", folder, file);
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  }
  throw new Error(`Archivo ${file} no encontrado en ${folder}`);
};

module.exports = { listJsonFiles, getJsonFromFile };