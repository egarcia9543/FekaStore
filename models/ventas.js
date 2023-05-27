const mongoose = require('../config/connection');

const schemaVenta = new mongoose.Schema({
    productosVenta: {
        type: Array,
        requiered: true
    },
    subtotal: {
        type: Number,
        requiered: true
    },
    fechaVenta: {
        type: Date,
        requiered: true
    },
    impuesto: {
        type: Number,
        requiered: true
    },
    totalVenta: {
        type: Number,
        requiered: true
    },
    cliente: {
        type: Object,
        requiered: true
    },
    vendedor: {
        type: Object,
        requiered: true
    }
})

const venta = mongoose.model('venta', schemaVenta);
module.exports = venta;