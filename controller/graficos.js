const producto = require('../models/productos')

exports.graficos = async (req, res)=> {
    const productos = await producto.find();
    const xValues = []
    const yValues = []
    
    productos.forEach(producto => {
        xValues.push(producto.nombre);
        yValues.push(producto.stock);
    });



    res.render('graficas')
}