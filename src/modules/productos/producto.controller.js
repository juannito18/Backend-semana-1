const pool = require("../../config/db");

exports.crearProducto = async (req, res) => {
  try {
    const { nombre, precio, stock } = req.body;

    const result = await pool.query(
      "INSERT INTO productos (nombre, precio, stock) VALUES ($1, $2, $3) RETURNING *",
      [nombre, precio, stock]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear producto" });
  }
};

exports.subirImagen = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No se recibió archivo" });
    }

    const { id } = req.params;

    await pool.query(
      "UPDATE productos SET imagen = $1 WHERE id = $2",
      [req.file.filename, id]
    );

    res.json({
      mensaje: "Imagen subida correctamente",
      archivo: req.file.filename
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al subir imagen" });
  }
};
