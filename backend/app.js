const express = require("express");
const jwt = require("jsonwebtoken");
const mariadb = require("mariadb");
const app = express();
const port = 3008;
const SECRET_KEY = "CLAVE_SECRETA";

// Conexión a la base de datos
const pool = mariadb.createPool({
  host: "localhost",
  user: "ecomerceAdmin",
  password: "1234",     
  database: "ecommerce",
  connectionLimit: 5,
});

// Rutas
const cartRoutes = require("./routes/cartRoutes");
const catsRoutes = require("./routes/catsRoutes");
const catsProductsRoutes = require("./routes/catsProductsRoutes");
const productsRoutes = require("./routes/productsRoutes");
const productsCommentsRoutes = require("./routes/productsCommentsRoutes");
const sellRoutes = require("./routes/sellRoutes");
const userCartRoutes = require("./routes/userCartRoutes");

// Middleware JSON
app.use(express.json());

// Middleware de autenticación
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "Token necesario" });
  }
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Token inválido" });
    req.user = user;
    next();
  });
};

// Rutas
app.use("/cart", cartRoutes);
app.use("/cats", catsRoutes);
app.use("/cats-products", catsProductsRoutes);
app.use("/products", productsRoutes);
app.use("/products-comments", productsCommentsRoutes);
app.use("/sell", sellRoutes);
app.use("/user-cart", userCartRoutes);

// Endpoint para guardar el carrito
app.post("/cart", async (req, res) => {
  const { userId, items } = req.body;  // Recibe el userId y los items del carrito
  let connection;

  try {
    connection = await pool.getConnection();
    
    // Insertar el carrito
    const resultCart = await connection.query(
      "INSERT INTO cart (user_id, total_price) VALUES (?, ?)",
      [userId, calculateTotalPrice(items)] // Función que calcula el total
    );

    //Insertar los items del carrito
    const cartId = resultCart.insertId;
    for (let item of items) {
      await connection.query(
        "INSERT INTO cart_items (cart_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
        [cartId, item.product_id, item.quantity, item.price]
      );
    }

    res.status(201).json({ message: "Carrito guardado correctamente", cartId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al guardar el carrito" });
  } finally {
    if (connection) connection.release();
  }
});

// calcular el total del carrito
function calculateTotalPrice(items) {
  return items.reduce((total, item) => total + item.quantity * item.price, 0);
}

// Endpoint para autenticación
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Validación de credenciales
  if (username === "admin" && password === "1234") {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Credenciales incorrectas" });
  }
});

// Inicialización del servidor
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
 

