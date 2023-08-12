const ventas = require('../models/ventas')
const vendedores = require('../models/vendedores')

exports.renderGraficos = async (req, res) => {
    res.render('admin/listaGraficas')
}

exports.cantidadVentas = async (req, res)=> {
    const listaVendedores = await vendedores.find({}, {nombreCompleto:1, ventasDespachadas:1 ,_id:0});
    res.render('admin/graficaCantidad', {
        'vendedores': listaVendedores,
    });
}