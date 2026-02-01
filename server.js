const express = require("express");
const app = express();

app.use(express.json());
app.post("/usuario", (req, res) => {
    const { nombre, edad } = req.body;
    res.json({ recibido: { nombre, edad } });
});
const productosRoutes = require("./routes/productos.routes");
app.use("/productos", productosRoutes);

// Base de datos falsa
let productos = [
  { id: 1, nombre: "Mouse", precio: 100 },
  { id: 2, nombre: "Teclado", precio: 200 }
];

// GET todos los productos
app.get("/productos", (req, res) => {
    res.json(productos);
});
app.get("/saludo", (req, res) => {
    res.json({ mensaje: "Hola desde GET!" });
});
app.put("/usuario/:id",(req,res)=>{
    const id = req.params.id;
    const datos = req.body;
    res.json({
        mensaje: "Usuario actualizado",
        id,
        nuevosDatos: datos
    });
});
// GET producto por ID
app.get("/productos/:id",validarId, (req, res) => {
    try{const id = Number(req.params.id);

    const producto = productos.find(p => p.id === id);

    if (!producto) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(producto);}catch (error){
        next(error);
    }
});

// POST crear producto
app.post("/productos",validarId, (req, res) => {
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
app.put("/productos/:id",validarId,(req,res)=>{
    const id =Number(req.params.id);
    const {nombre, precio} = req.body;
    if (!nombre && !precio) {
        return res.status(400).json({error:"Debes enviar nombre o precio"});
    }
    const producto = productos.find(p => p.id === id);
    if (!producto) {
        return res.status(404).json({error:"producto no encontrado"});
    }
      if (nombre) producto.nombre = nombre;
  if (precio) producto.precio = precio;

  res.json(producto);
});
function validarId(req, res, next) {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "El ID debe ser un número" });
  }
  next();
}



// DELETE eliminar producto
app.delete("/productos/:id",validarId, (req, res) => {
    const id = Number(req.params.id);

    productos = productos.filter(p => p.id !== id);

    res.json({ mensaje: "Producto eliminado" });
});
app.delete("/usuario/:id",validarId,(req,res)=>{
    const id= req.params.id;
    res.json({mensaje:`Usuario ${id} eliminado`});
});

// Middleware global de errores
app.use((err, req, res, next) => {
    console.error("❌ Error global:", err.message);
    res.status(500).json({ error: "Error interno del servidor" });
});

// Iniciar servidor
app.get("/", (req, res) => {
  res.send("API de productos funcionando 🚀");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});



