const mongoose = require('../config/connection');

const schemaVendedor = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    documento: {
        type: String,
        required: true,
        unique: true
    },
    ventasDespachadas: {
        type: Array
    }
});

const vendedor = mongoose.model('vendedor', schemaVendedor);
module.exports = vendedor;