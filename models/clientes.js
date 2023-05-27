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
        latitud: {
            type: Number,
            required: true
        },
        longitud: {
            type: Number,
            required: true
        }
    },
    totalComprado: {
        type: Number
    },
    // historialCompras: {
    //     type: Array
    // }
});


const cliente = mongoose.model('cliente', schemaCliente);
module.exports = cliente
