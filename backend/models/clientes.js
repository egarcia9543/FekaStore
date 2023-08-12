const mongoose = require('../config/connection');
const schemaCliente = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    telefono: {
        type: String,
        required: true
    },
    ubicacion: {
        centro: {
            type: Array,
            required: true
        },
        zoom: {
            type: Number,
            default: 20
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
        required: true
    }
});


const cliente = mongoose.model('cliente', schemaCliente);
module.exports = cliente
