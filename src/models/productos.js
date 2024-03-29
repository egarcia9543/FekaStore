const mongoose = require("../config/database");

const schemaProducto = new mongoose.Schema({
  referencia: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
  },
  imagen: {
    type: String,
    required: true,
  },
  habilitado: {
    type: Boolean,
  },
});

const producto = mongoose.model("producto", schemaProducto);
module.exports = producto;
