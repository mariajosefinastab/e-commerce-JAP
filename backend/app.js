const express = require("express");
const app = express();
const port = 3000;

const cors = require("cors");
app.use(cors());

const categoriesRouter = require("./routes/categoriesRouter");
app.use("/categories", categoriesRouter); 

const productsRouter = require("./routes/productsRouter");
app.use("/products", productsRouter); 
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
 

