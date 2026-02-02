//const Producto = require("./models/Producto");
const Tarea = require("./models/Tarea");
require("dotenv").config();


const mongoose = require("mongoose");

mongoose.connect(

"mongodb+srv://rey:rey4321@juan.xeqll4f.mongodb.net/?appName=juan"

)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("🟢 MongoDB conectado"))
  .catch(err => console.error("🔴 Error MongoDB:", err));

const express = require("express");

const app = express();

app.use(express.json());


app.post("/tareas", async (req, res) => {
  try {
    const tarea = new Tarea(req.body);
    await tarea.save();
    res.status(201).json(tarea);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/tareas", async (req, res) => {
  const tareas = await Tarea.find();
  res.json(tareas);
});

app.put("/tareas/:id", async (req, res) => {
  try {
    const tarea = await Tarea.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!tarea) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    res.json(tarea);
  } catch {
    res.status(400).json({ error: "ID inválido" });
  }
});

app.delete("/tareas/:id", async (req, res) => {
  try {
    const tarea = await Tarea.findByIdAndDelete(req.params.id);

    if (!tarea) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    res.json({ mensaje: "Tarea eliminada" });
  } catch {
    res.status(400).json({ error: "ID inválido" });
  }
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});






















/*

app.post("/productos", async (req, res) => {

try {

const producto = new Producto(req.body);

await producto.save();

res.status(201).json(producto);

} catch (error) {

res.status(400).json({ error: error.message });

}

});

app.get("/productos", async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
});
app.get("/productos/:id", async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);

    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(producto);
  } catch (error) {
    res.status(400).json({ error: "ID inválido" });
  }
});
app.put("/productos/:id", async (req, res) => {
  try {
    const actualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!actualizado) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar producto" });
  }
});
app.delete("/productos/:id", async (req, res) => {
  try {
    const eliminado = await Producto.findByIdAndDelete(req.params.id);

    if (!eliminado) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json({ mensaje: "Producto eliminado" });
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar producto" });
  }
});
*/

// Middleware global de errores

app.use((err, req, res, next) => {

console.error("❌ Error global:", err.message);

res.status(500).json({ error: "Error interno del servidor" });

});

// Iniciar servidor

app.get("/", (req, res) => {

res.send("API de productos funcionando 🚀");

});


