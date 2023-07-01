const producto = require('../models/productos')

exports.registroProducto = async (req, res) => {
    res.render('registroProductos')
}

exports.nuevoProducto = async (req, res) => {
    const nuevoProducto = new producto({
        referencia: req.body.referenciaProducto,
        nombre: req.body.nombreProducto,
        descripcion: req.body.descripcionProducto,
        precio: req.body.precioProducto,
        stock: req.body.stockProducto,
        imagen: req.body.imagenProducto
    })
    nuevoProducto.save();
    res.redirect('/store/v1/datatableproductos');
}

exports.catalogo = async (req, res) => {
    let productos = await producto.find();
    
    res.render('catalogo', {
        "productos": productos
    })
}