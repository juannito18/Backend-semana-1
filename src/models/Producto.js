const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
    required: true
  },
  creadoEn: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Producto", productoSchema);
