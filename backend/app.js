const express = require("express");
const mariadb = require("mariadb");
const jwt = require("jsonwebtoken");
const app = express();

const pool = mariadb.createPool({
  host: "localhost",
  user: "ecomerceAdmin",
  password: "1234",
  database: "ecomerce",
  connectionLimit: 5,
});

const port = 3008;
const SECRET_KEY = "CLAVE_SECRETA";

// Rutas
const categoriesRouter = require("./routes/categoriesRouter");
const categoriesRouter = require("./routes/productsRouter");


app.use(express.json());

// Middleware de autenticación
app.use("/surveys", (req, res, next) => {
  const token = req.headers["authorization"];
  if (token) {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) return res.status(403).json({ message: "Token inválido" });
      req.user = decoded;
      next();
    });
  } else {
    res.status(401).json({ message: "Token necesario" });
  }
});

app.use("/categories", categoriesRouter);
app.use("/products", productsRouter); 

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});



/* const express = require("express");
const app = express();
const port = 3000;

const categoriesRouter = require("./routes/categoriesRouter");
app.use("/categories", categoriesRouter); 

const productsRouter = require("./routes/productsRouter");
app.use("/products", productsRouter); 
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  }); */
 

