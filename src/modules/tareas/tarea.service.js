const db = require("../../config/db");

exports.listar = async () => {
  const result = await db.query("SELECT * FROM tareas");
  return result.rows;
};
