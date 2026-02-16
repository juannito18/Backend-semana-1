const service = require("./tarea.service");

exports.listar = async (req, res, next) => {
  try {
    const tareas = await service.listar();
    res.json(tareas);
  } catch (err) {
    next(err);
  }
};
