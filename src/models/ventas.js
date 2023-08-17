const mongoose = require("../config/database");

const schemaVenta = new mongoose.Schema({
  productosVenta: {
    type: Array,
    required: true,
  },
  subtotal: {
    type: Number,
    required: true,
  },
  fechaVenta: {
    type: Date,
    required: true,
  },
  impuesto: {
    type: Number,
    required: true,
    default: 19,
  },
  totalVenta: {
    type: Number,
    required: true,
  },
  cliente: {
    type: Object,
    required: true,
  },
  vendedor: {
    type: Object,
    required: true,
  },
});

const venta = mongoose.model("venta", schemaVenta);
module.exports = venta;
