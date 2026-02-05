function validarTarea(req, res, next) {
  const { titulo } = req.body;

  if (!titulo) {
    return res.status(400).json({ error: "Título obligatorio" });
  }

  next(); // 👈 SIN ESTO, SE CUELGA
}


module.exports = validarTarea;
