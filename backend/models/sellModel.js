const { listJsonFiles, getJsonFromFile } = require("./jsonModel");

const folder = "sell";

const listSales = () => listJsonFiles(folder);
const getSale = (id) => getJsonFromFile(folder, `${id}.json`);

module.exports = { listSales, getSale };