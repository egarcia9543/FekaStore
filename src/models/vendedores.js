const mongoose = require('../config/database');

const schemaVendedor = new mongoose.Schema({
    nombreCompleto: {
        type: String,
        required: true
    },
    documento: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
    },
    ventasDespachadas: {
        type: Array,
        default: []
    },
    password: {
        type: String,
        required: true
    }
});

const vendedor = mongoose.model('vendedor', schemaVendedor);
module.exports = vendedor;