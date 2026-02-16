const usuarioService = require("./usuario.service");
const pool = require("../../config/db"); 

exports.crearUsuario = async (req, res, next) => {
  try {
    const nuevoUsuario = await usuarioService.crearUsuario(req.body);
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    next(error);
  }
};
exports.crearProducto = async (req, res) => {
  const { nombre, precio, stock } = req.body;

  const result = await pool.query(
    "INSERT INTO productos (nombre, precio, stock) VALUES ($1, $2, $3) RETURNING *",
    [nombre, precio, stock]
  );

  res.status(201).json(result.rows[0]);
};

exports.listarUsuarios = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const offset = (page - 1) * limit;

    const usuarios = await pool.query(
      "SELECT * FROM usuarios ORDER BY id LIMIT $1 OFFSET $2",
      [limit, offset]
    );

    res.json({
      page,
      limit,
      data: usuarios.rows
    });

  } catch (error) {
    console.error(error);
   
  }
};

exports.eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const resultado = await pool.query(
      "DELETE FROM usuarios WHERE id = $1 RETURNING *",
      [id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        error: "Usuario no encontrado"
      });
    }

    res.json({
      mensaje: "Usuario eliminado correctamente",
      usuario: resultado.rows[0]
    });

  } catch (error) {
    console.error(error);
   
  }
};
