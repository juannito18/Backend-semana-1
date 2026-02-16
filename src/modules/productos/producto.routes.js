const express = require("express");
const router = express.Router();
const upload = require("../../middlewares/upload");
console.log("RUTAS DE PRODUCTOS CARGADAS");

const {
  crearProducto,
  subirImagen
} = require("./producto.controller");

// Crear producto
router.post("/", crearProducto);

// Subir imagen
router.post("/:id/imagen", upload.single("imagen"), (req, res) => {
  console.log("BODY:", req.body);
  console.log("FILE:", req.file);

  res.json({
    body: req.body,
    file: req.file
  });
});


module.exports = router;
