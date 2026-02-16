const pool = require("../config/db");
// CREATE
const crearTarea = async (titulo,usuario_id) => {
  const result =await pool.query(
    "INSERT INTO tareas (titulo, usuario_id) VALUES ($1, $2) RETURNING*",
    [titulo,usuario_id]
  );
  return result.rows[0];

};

const listarTareas = async () => {
  const result = await pool.query("SELECT * FROM tareas");
  return result.rows;
};

const eliminarTarea = async (id) => {
   await pool.query("DELETE FROM tareas WHERE id = $1", [id]);
};

module.exports = {
  crearTarea,
  listarTareas,
  eliminarTarea
};
