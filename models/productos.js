const mongoose = require('../config/connection');

const schemaProducto = new mongoose.Schema({
    referencia: {
        type: String,
        requiered: true
    },
    nombre: {
        type: String,
        requiered: true
    },
    descripcion: {
        type: String,
        requiered: true
    },
    precio: {
        type: Number,
        requiered: true
    },
    stock: {
        type: Number
    },
    imagen: {
        type: String,
        requiered: true
    },
    habilitado: {
        type: Boolean,
        requiered: true
    }
});

const producto = mongoose.model('producto', schemaProducto);
module.exports = producto