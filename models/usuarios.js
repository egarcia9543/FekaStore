const mongoose = require('../config/connection');
const schemaUsuario = new mongoose.Schema({
    email: {
        type: String,
    },
    password: {
        type: String
    },
    rol: {
        type: String,
        required: true
    },
    habilitado: {
        type: Boolean,
        default: true
    }
});

const usuario = mongoose.model('usuario', schemaUsuario);
module.exports = usuario;