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
    let productos = await producto.find({ "habilitado": "true" });
    const productosPorPagina = 18;
    const paginaActual = parseInt(req.query.page) || 1;
    const inicio = (paginaActual - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;

    // Assuming 'productos' is your array of products
    const productosEnPagina = productos.slice(inicio, fin);

    // Calculate the total number of pages
    const paginasTotales = Math.ceil(productos.length / productosPorPagina);

    // Render the 'products' template and pass the paginated products and paginasTotales as variables
    res.render('catalogo', { productos: productosEnPagina, paginasTotales, paginaActual });

    // res.render('catalogo', {
    //     "productos": productos
    // })
}