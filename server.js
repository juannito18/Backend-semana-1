require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const tareaRoutes = require("./routes/tareaRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("🟢 Mongo conectado"))
  .catch(err => console.error("❌ Mongo error", err));

app.use("/api", tareaRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

