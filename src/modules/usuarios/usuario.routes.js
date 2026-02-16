const express = require("express");
const router = express.Router();

const {
  obtenerUsuarios,
  crearUsuario,
  listarUsuarios,
  eliminarUsuario,
  crearProducto
} = require("./usuarioController");

const verifyToken = require("../../middlewares/verifyToken");
const authorize = require("../../middlewares/authorize");

// GET
router.get("/", listarUsuarios);

// POST
router.post("/", crearProducto);


// DELETE (solo admin)
router.delete(
  "/:id",
  verifyToken,
  authorize(["admin"]),
  eliminarUsuario
);

module.exports = router;
