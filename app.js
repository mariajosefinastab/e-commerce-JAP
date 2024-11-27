const express = require("express");
const cors = require("cors");

const app = express();
const port = 3008;

// Importar rutas
const cartRoutes = require("./routes/cartRoutes");
const catsRoutes = require("./routes/catsRoutes");
const catsProductsRoutes = require("./routes/catsProductsRoutes");
const productsRoutes = require("./routes/productsRoutes");
const productsCommentsRoutes = require("./routes/productsCommentsRoutes");
const sellRoutes = require("./routes/sellRoutes");

// Middleware
app.use(cors());
app.use(express.json());

// Usar rutas
app.use("/cart", cartRoutes);
app.use("/categories", catsRoutes);
app.use("/cats-products", catsProductsRoutes);
app.use("/products", productsRoutes);
app.use("/products-comments", productsCommentsRoutes);
app.use("/sell", sellRoutes);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});