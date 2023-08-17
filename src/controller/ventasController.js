const createSaleUsecase = require('../usecases/Venta/create');
const listAllSalesUsecase = require('../usecases/Venta/list');
const deleteSaleUsecase = require('../usecases/Venta/delete');
const generateFormUsecase = require('../usecases/Venta/showsalesform');
const verifyUserUsecase = require('../usecases/Venta/userverification');


exports.registerSale = async (req, res) => {
    try {
        const resultado = await createSaleUsecase.createSaleRecord(req.body);
        if (!resultado) {
            return res.status(400).json({
                error: 'Error al registrar la venta'
            });
        }
        return res.render('confirmacioncompra');
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Error al registrar la venta'
        });
    }
}

exports.listSales = async (req, res) => {
    try {
        const resultado = await listAllSalesUsecase.listAllSales();
        return res.render('admin/listOfVentas', {
            'ventas': resultado
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Error al listar las ventas'
        });
    }
}

exports.deleteSale = async (req, res) => {
    try {
        const resultado = await deleteSaleUsecase.deleteSale(req.params.id);
        if (resultado.error){
            return res.status(400).json({
                error: resultado.error
            });
        }
        return res.redirect('/store/v1/datatableventas');
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Error al eliminar la venta'
        });
    }
}

exports.saleForm = async (req, res) => {
    try {
        const resultado = await generateFormUsecase.generateForm(req.cookies.token);
        if (resultado.error){
            return res.status(400).json({
                error: resultado.error
            });
        }
        return res.render('admin/registrarVenta', {
            'vendedor': resultado.seller,
            'productos': resultado.products,
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Error al generar el formulario'
        });
    }
}

exports.userTokenVerification = async (req, res) => {
    try {
        const resultado = await verifyUserUsecase.verifyUser(req.cookies.token);
        if (resultado.error) {
            return res.redirect('/store/v1/signin');
        }
        return res.render('compra', {
            usuario: resultado.cliente
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Error al verificar el usuario'
        });
    }
};