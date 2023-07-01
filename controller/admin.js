const producto = require('../models/productos')
const cliente = require('../models/clientes')


exports.landingAdmin =  (req, res) => {
    res.render('admin/index')
};

exports.listOfProducts = async (req, res) => {
    let productos = await producto.find();
    res.render('admin/listOfProducts', {
        "productos": productos
    });
};