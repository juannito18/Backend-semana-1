const pool = require("../config/db");

exports.crearTarea = async (req, res) => {
  const { titulo, usuario_id } = req.body;

  const result = await pool.query(
    "INSERT INTO tareas (titulo, usuario_id) VALUES ($1, $2) RETURNING *",
    [titulo, usuario_id]
  );

  res.json(result.rows[0]);
};

exports.listarTareas = async (req, res) => {
  const result = await pool.query(
    "SELECT tareas.id, tareas.titulo, usuarios.nombre FROM tareas JOIN usuarios ON tareas.usuario_id = usuarios.id"
  );

  res.json(result.rows);
};




























/*
const crear = async (req, res, next) => {
  try {
    const {titulo, usuario_id}= req.body;
    const tarea = await tareaService.crearTarea(titulo,usuario_id);
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
*/