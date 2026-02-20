require("dotenv").config();



const app = require("./app");
const pool = require("./config/db");
const NodeCache = require("node-cache");

const cache = new NodeCache({
  stdTTL: 60 // cache 60 segundos
});

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error conexión DB:", err);
  } else {
    console.log("DB conectada:", res.rows);
  }
});

app.get("/users",async(req,res)=>{
  const cachet = cache.get("users");
  if (cached) {
    console.log("Desde cache");
    return res.json(cached);
  }
})

try {
  const result = await pool.query("SELECT * FROM users");
  cache.set("users",result.rows);
  console.log("desde Db");
  res.json(result.rows);
} catch (error) {
  res.json(result.rows);
}
app.post("/users", async (req, res) => {
  const { name, email } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );
cache.del("users");
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});










/*
app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.post("/users", async (req, res) => {
  const { name, email } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.put("/users/:id",async(req, res)=>{
  const { id }= req.params;
  const {name, email} = req.body;

try {
  const result = await pool.query(
    "UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *",
      [name, email, id]
  );
  res.json(result.rows[0]);
} catch (error) {
   res.status(500).json({ error: error.message });
}



})
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM users WHERE id=$1", [id]);
    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});*/

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});




/*require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = require("./app");

const errorHandler = require("./middlewares/errorHandler");
const pool = require("./config/db");

pool.connect()
  .then(() => console.log("✅ Conectado a PostgreSQL"))
  .catch(err => console.error("❌ Error conexión", err));

const app = express();
app.use(express.json());
app.use(cors({
  origin: "*"
}));

const usuarioRoutes = require("./routes/usuarioRoutes");
const tareaRoutes = require("./routes/tareaRoutes");

app.use("/api", usuarioRoutes);
app.use("/api", tareaRoutes);
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("🟢 Mongo conectado"))
  .catch(err => console.error("❌ Mongo error", err));







app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});


*/