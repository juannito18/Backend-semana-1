const Usuario = require("./auth.model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generarToken = (usuario) => {
  return jwt.sign(
    {
      id: usuario.id,
      email: usuario.email,
      rol: usuario.rol  // 👈 MUY IMPORTANTE
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

function crearToken(usuario) {
  return jwt.sign(
    { id: usuario._id, email: usuario.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
}

async function register({ email, password }) {
  if (!email || !password) {
    throw new Error("Email y password obligatorios");
  }

  const existe = await Usuario.findOne({ email });
  if (existe) {
    throw new Error("Usuario ya existe");
  }

  const hashed = await bcrypt.hash(password, 10);

  const usuario = new Usuario({
    email,
    password: hashed
  });

  await usuario.save();
  return { mensaje: "Usuario registrado" };
}

async function login({ email, password }) {
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    throw new Error("Usuario no encontrado");
  }

  const ok = await bcrypt.compare(password, usuario.password);
  if (!ok) {
    throw new Error("Password incorrecto");
  }

  const token = crearToken(usuario);
  return { token };
}

module.exports = { register, login };
