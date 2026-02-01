let productos = [
  { id: 1, nombre: "Mouse", precio: 100 },
  { id: 2, nombre: "Teclado", precio: 200 }
];

exports.obtenerProductos = (req, res) => {
  res.json(productos);
};

exports.obtenerProducto = (req, res) => {
  const id = Number(req.params.id);
  const producto = productos.find(p => p.id === id);

  if (!producto) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  res.json(producto);
};

exports.crearProducto = (req, res) => {
  const { nombre, precio } = req.body;

  if (!nombre || !precio) {
    return res.status(400).json({ error: "Nombre y precio obligatorios" });
  }

  const nuevo = {
    id: productos.length + 1,
    nombre,
    precio
  };

  productos.push(nuevo);
  res.status(201).json(nuevo);
};
exports.actualizarProducto = (req, res) => {
  const id = Number(req.params.id);
  const { nombre, precio } = req.body;

  const producto = productos.find(p => p.id === id);
  if (!producto) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  if (nombre) producto.nombre = nombre;
  if (precio) producto.precio = precio;

  res.json(producto);
};

exports.eliminarProducto = (req, res) => {
  const id = Number(req.params.id);
  productos = productos.filter(p => p.id !== id);
  res.json({ mensaje: "Producto eliminado" });
};
