const mongoose = require('../config/connection');
const schemaCliente = new mongoose.Schema({
    nombre: {
        type: String,
        requiered: true
    },
    cedula: {
        type: String,
        requiered: true,
        unique: true
    },
    telefono: {
        type: String,
        requiered: true
    },
    ubicacion: {
        centro: {
            type: Array,
            required: true
        },
        zoom: {
            type: Number,
            required: true
        }
    },
    totalComprado: {
        type: Number,
        default: 0
    },
    historialCompras: {
        type: Array,
        default: []
    },
    password: {
        type: String,
        requiered: true
    }
});


const cliente = mongoose.model('cliente', schemaCliente);
module.exports = cliente
