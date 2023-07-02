const producto = require('../models/productos');
const cliente = require('../models/clientes');
const vendedor = require('../models/vendedores');


exports.landingAdmin =  (req, res) => {
    res.render('admin/index')
};

exports.listOfProducts = async (req, res) => {
    let productos = await producto.find();
    res.render('admin/listOfProducts', {
        "productos": productos
    });
};

exports.listOfClients = async (req, res) => {
    let clientes = await cliente.find();
    res.render('admin/listOfClients', {
        "clientes": clientes
    });
};

exports.listOfWorkers = async (req, res) => {
    let vendedores = await vendedor.find();
    res.render('admin/listOfWorkers', {
        "vendedores": vendedores
    });
};