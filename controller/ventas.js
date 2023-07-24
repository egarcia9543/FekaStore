const producto = require('../models/productos');
const venta = require('../models/ventas');
const cliente = require('../models/clientes');
const nodemailer = require('nodemailer');


exports.realizarCompra = async (req, res) => {
    localStorage.clear();
}