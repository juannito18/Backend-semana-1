const express = require("express");
const router = express.Router();

const {
  crear,
  listar,
  eliminar
} = require("../controllers/tareaController");

const validarTarea = require("../middlewares/validarTarea");
router.post("/tareas", validarTarea, crear);

//router.post("/tareas", crear);
router.get("/tareas", listar);
router.delete("/tareas/:id", eliminar);

module.exports = router;
