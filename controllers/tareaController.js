const tareaService = require("../services/tareaService");

const crear = async (req, res, next) => {
  try {
    const tarea = await tareaService.crearTarea(req.body);
    res.status(201).json(tarea);
  } catch (error) {
    next(error);
  }
};

const listar = async (req, res, next) => {
  try {
    const tareas = await tareaService.listarTareas();
    res.json(tareas);
  } catch (error) {
    next(error);
  }
};

const eliminar = async (req, res, next) => {
  try {
    await tareaService.eliminarTarea(req.params.id);
    res.json({ mensaje: "Tarea eliminada" });
  } catch (error) {
    next(error);
  }
};

module.exports = { crear, listar, eliminar };
