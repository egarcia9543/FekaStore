const mongoose = require('../config/database');
const schemaUsuario = new mongoose.Schema({
    email: {
        type: String,
        unique: true
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