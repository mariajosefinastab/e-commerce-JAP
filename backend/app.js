require("dotenv").config(); // Carga variables de entorno
const express = require("express");
const jwt = require("jsonwebtoken");

const peopleRouter = require("./routes/peopleRoute");
const app = express();

// Leer la clave secreta y puerto desde variables de entorno
const SECRET_KEY = process.env.SECRET_KEY;
const PORT = process.env.PORT || 3000;

// Middleware para procesar JSON
app.use(express.json());

// Ruta de bienvenida
app.get("/", (req, res) => {
  res.send("<h1>Bienvenid@ al servidor</h1>");
});

// Endpoint de autenticación
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Validar credenciales estáticas
  if (username === "admin" && password === "admin") {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: "Usuario y/o contraseña incorrectos" });
  }
});

// Middleware de autorización
app.use("/people", (req, res, next) => {
  const token = req.headers["access-token"];
  if (!token) {
    return res.status(403).json({ message: "Token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("Token válido:", decoded);
    next();
  } catch (err) {
    res.status(401).json({ message: "Token inválido o expirado" });
  }
});

// Rutas protegidas
app.use("/people", peopleRouter);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
