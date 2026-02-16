const pool = require("../../config/db");

const crearUsuario = async ({ nombre, email, password, rol }) => {
  const result = await pool.query(
    "INSERT INTO usuarios (nombre, email, password, rol) VALUES ($1, $2, $3, $4) RETURNING *",
    [nombre, email, password, rol || "usuario"]
  );

  return result.rows[0];
};


const obtenerUsuarios = async () => {
  const result = await pool.query("SELECT * FROM usuarios");
  return result.rows;
};

module.exports = {
  crearUsuario,
  obtenerUsuarios
};
