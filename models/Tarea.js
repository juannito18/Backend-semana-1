const mongoose = require("mongoose");

const tareaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  completada: {
    type: Boolean,
    default: false
  },
  creadaEn: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Tarea", tareaSchema);
