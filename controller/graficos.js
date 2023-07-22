const venta = require('../models/productos')

exports.graficos = async (req, res)=> {
    const productos = await venta.find({}, {nombre:1, stock:1, _id:0});

    res.render('graficas', {
        productos
    });
}