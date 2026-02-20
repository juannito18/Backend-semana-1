const express = require("express");
const compression = require("compression");
const app = express();

const path = require("path");

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/auth", require("./modules/auth/auth.routes"));
app.use("/usuarios", require("./modules/usuarios/usuario.routes"));
app.use("/tareas", require("./modules/tareas/tarea.routes"));
app.use("/productos", require("./modules/productos/producto.routes"));

// 🔥 JSON después de las rutas que usan multer
app.use(compression()); // 🔥 compresión gzip
app.use(express.json());

app.use(require("./middlewares/errorHandler"));

module.exports = app;
