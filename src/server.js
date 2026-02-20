require("dotenv").config();



const app = require("./app");
const pool = require("./config/db");

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error conexión DB:", err);
  } else {
    console.log("DB conectada:", res.rows);
  }
});

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