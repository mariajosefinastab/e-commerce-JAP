const express = require("express");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "CLAVESUPERSECRETA";

const app = express();
const port = 3000;

app.use(express.json());

const cors = require("cors");
app.use(cors());

const productsRouter = require("./routes/productsRouter");
const categoriesRouter = require("./routes/categoriesRouter");
const cartRouter = require("./routes/cartRouter");


//MIDDLEWARE
app.use((req, res, next)=>{
  try{
    //rutas públicas
    const publicRoutes = ["/login"];
    if (publicRoutes.includes(req.path)) {
        console.log("Middleware: pasa sin verificar")
        return next(); 
    }
    //primer parametro va el token que lo guardamos en el header del POSTMAN, con la clave access-token, en el segundo parametro ponemos nuestra constante con la clave secreta.
    const decoded = jwt.verify(req.headers['access-token'], SECRET_KEY);
    next()
  }catch (err){
    console.log("No autrorizado")
    res.status(401).json({message: "Usuario no autorizado"});
  }

});


app.use("/categories", categoriesRouter); 
app.use("/products", productsRouter); 
app.use("/cart", cartRouter);

// Endpoint de autenticación
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log("login", username, password)
  // Validar credenciales estáticas
  if (username === "admin" && password === "admin") {
    const token = jwt.sign({ username }, SECRET_KEY);
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: "Usuario y/o contraseña incorrectos" });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
 

