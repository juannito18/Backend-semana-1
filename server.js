const express = require("express");
const app = express();

app.use(express.json());

// Base de datos falsa
let productos = [
  { id: 1, nombre: "Mouse", precio: 100 },
  { id: 2, nombre: "Teclado", precio: 200 }
];

// GET todos los productos
app.get("/productos", (req, res) => {
    res.json(productos);
});

// GET producto por ID
app.get("/productos/:id", (req, res) => {
    const id = Number(req.params.id);

    const producto = productos.find(p => p.id === id);

    if (!producto) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(producto);
});

// POST crear producto
app.post("/productos", (req, res) => {
    const { nombre, precio } = req.body;

    if (!nombre || !precio) {
        return res.status(400).json({ error: "Nombre y precio son obligatorios" });
    }

    const nuevo = {
        id: productos.length + 1,
        nombre,
        precio
    };

    productos.push(nuevo);

    res.status(201).json(nuevo);
});

// DELETE eliminar producto
app.delete("/productos/:id", (req, res) => {
    const id = Number(req.params.id);

    productos = productos.filter(p => p.id !== id);

    res.json({ mensaje: "Producto eliminado" });
});

// Middleware global de errores
app.use((err, req, res, next) => {
    console.error("❌ Error global:", err.message);
    res.status(500).json({ error: "Error interno del servidor" });
});

// Iniciar servidor
app.listen(3000, () => {
    console.log("Servidor Express en http://localhost:3000");
});
