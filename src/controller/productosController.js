const createProductUsecase = require('../usecases/Producto/create');
const listProductUsecase = require('../usecases/Producto/list');
const catalogueProductUsecase = require('../usecases/Producto/catalogue');
const updateProductUsecase = require('../usecases/Producto/update');
const updateStateProductUsecase = require('../usecases/Producto/state');
const deleteProductUsecase = require('../usecases/Producto/delete');

exports.renderProductsForm = async (req, res) => {
    res.render('registroProductos');
};

exports.registerNewProduct = async (req, res) => {
    try {
        const resultado = await createProductUsecase.createNewProduct(req.body);

        if (resultado.error) {
            return res.status(400).json({
                error: resultado.error
            });
        }

        return res.redirect('/store/v1/datatableproductos');
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Error al registrar el producto',
        });
    }
};

exports.listProducts = async (req, res) => {
    try {
        const resultado = await listProductUsecase.listAllProducts();
        return res.render('admin/listOfProducts', {
            'productos': resultado,
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Error al listar los productos',
        });
    }
};

exports.showCatalogue = async (req, res) => {
    try {
        const resultado = await catalogueProductUsecase.listCatalogue();

        const productosPorPagina = 18;
        const paginaActual = parseInt(req.query.page) || 1;
        const inicio = (paginaActual - 1) * productosPorPagina;
        const fin = inicio + productosPorPagina;
    
        const productosEnPagina = resultado.slice(inicio, fin);
        const paginasTotales = Math.ceil(resultado.length / productosPorPagina);
        return res.render('catalogo', {
            productos: productosEnPagina, 
            paginasTotales, 
            paginaActual
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Error al listar los productos',
        });
    }
};

exports.updateProductData = async (req, res) => {
    try {
        const resultado = await updateProductUsecase.updateProduct(req.body)
        if (resultado.error) {
            return res.status(400).json({
                error: resultado.error,
            });
        }
        return res.redirect('/store/v1/datatableproductos');
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Error al actualizar el producto',
        });
    }
};

exports.updateState = async (req, res) => {
    try {
        const resultado = await updateStateProductUsecase.changeState(req.params.id);
        if (resultado.error) {
            return res.status(400).json({
                error: resultado.error,
            });
        }
        return res.redirect('/store/v1/datatableproductos');
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Error al actualizar el estado del producto',
        });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        await deleteProductUsecase.deleteProduct(req.params.id);
        return res.redirect('/store/v1/datatableproductos');
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Error al eliminar el producto',
        });
    }
};



