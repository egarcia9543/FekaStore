const producto = require('../models/productos')

exports.graficos = async (req, res)=> {
    const productos = await producto.find({}, {nombre:1, stock:1, _id:0});

    res.render('graficas', {
        productos
    });
}