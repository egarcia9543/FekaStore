const mongoose = require('../config/connection');

const schemaVendedor = new mongoose.Schema({
    nombre: {
        type: String,
        requiered: true
    },
    documento: {
        type: String,
        requiered: true,
        unique: true
    },
    ventasDespachadas: {
        type: String
    }
});

const vendedor = mongoose.model('vendedor', schemaVendedor);
module.exports = vendedor;