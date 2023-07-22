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

exports.actualizarHabilitado = async (req, res) => {
    let estadoProducto = await producto.findById(req.params.id);
    estadoProducto.habilitado = !estadoProducto.habilitado;
    await estadoProducto.save();
    res.redirect('/store/v1/datatableproductos');
};

exports.actualizarDataProducto = async (req, res) => {
    await producto.findByIdAndUpdate(req.body.id, {
        referencia: req.body.referencia,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        stock: req.body.stock,
        precio: req.body.precio,
    });
    res.redirect('/store/v1/datatableproductos');
};