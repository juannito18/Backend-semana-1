//const Producto = require("./models/Producto");
const jwt = require("jsonwebtoken");
const auth = require("./middlewares/auth");
const cors = require("cors");

const bcrypt = require("bcrypt");
const Usuario = require("./models/Usuario");

require("dotenv").config();
const express = require("express");

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.json());


const mongoose = require("mongoose");


mongoose.connect(

"mongodb+srv://rey:rey4321@juan.xeqll4f.mongodb.net/?appName=juan"

)
  .then(() => console.log("🟢 MongoDB conectado"))
  .catch(err => console.error("🔴 Error MongoDB:", err));



app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validación básica
    if (!email || !password) {
      return res.status(400).json({ error: "Email y password obligatorios" });
    }

    // Evitar duplicados
    const existe = await Usuario.findOne({ email });
    if (existe) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }

    // Hash
    const hashedPassword = await bcrypt.hash(password, 10);

    const usuario = new Usuario({
      email,
      password: hashedPassword
    });

    await usuario.save();

    res.status(201).json({ mensaje: "Usuario registrado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error en registro" });
  }
});


function crearToken(usuario) {
  return jwt.sign(

    {
      id: usuario._id, email: usuario.email
    },
    process.env.JWT_SECRET,
    {expiresIn: "1h"}
  );
}
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email y password obligatorios" });
    }

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    const ok = await bcrypt.compare(password, usuario.password);
    if (!ok) {
      return res.status(400).json({ error: "Contraseña incorrecta" });
    }

    const token = crearToken(usuario);

    res.json({
      mensaje: "Login correcto",
      token
    });
  } catch (error) {
    res.status(500).json({ error: "Error en login" });
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

  }
});




app.get("/perfil", auth, (req, res) => {
  res.json({
    mensaje: "Acceso autorizado",
    usuario: req.usuario
  });
});



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});













// Middleware global de errores

app.use((err, req, res, next) => {

console.error("❌ Error global:", err.message);

res.status(500).json({ error: "Error interno del servidor" });

});

// Iniciar servidor

app.get("/", (req, res) => {

res.send("API de productos funcionando 🚀");

});


