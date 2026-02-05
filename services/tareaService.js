const Tarea = require("../models/Tarea");

const crearTarea = async (data) => {
  return await Tarea.create(data);
};

const listarTareas = async () => {
  return await Tarea.find();
};

const eliminarTarea = async (id) => {
  return await Tarea.findByIdAndDelete(id);
};

module.exports = {
  crearTarea,
  listarTareas,
  eliminarTarea
};
