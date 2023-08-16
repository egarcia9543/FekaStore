const express = require('express');

const routeExcel = require('../controller/excelfornode')
const userFunctions = require('../controller/usuario')
const graphFunctions = require('../controller/graficos')
const adminFunctions = require('../controller/admin')
const salesFunctions = require('../controller/ventas')

const productController = require('../controller/productosController');
const vendedoresController = require('../controller/vendedoresController');
const clientesController = require('../controller/clientesController');

const router = express.Router();

//----------Render landing page------------//
router.get('/index', clientesController.renderLandingPage);

//-----------------Funciones de usuario---------------------- //
router.get('/registroclientes', clientesController.renderSignupForm);
router.get('/signin', clientesController.renderLoginForm);
router.get('/recuperar', clientesController.renderRecoverForm);

router.get('/perfil', userFunctions.tokenVerification, userFunctions.perfilCliente);
router.get('/logout', userFunctions.logout);
router.post('/editarperfil', userFunctions.actualizarPerfil);
router.post('/nuevocliente', clientesController.registerNewClient);
router.post('/login', userFunctions.loginCLiente);





router.post('/email', userFunctions.sendEmail)

//Ventas
router.get('/compra', salesFunctions.verificarUsuario);
router.post('/finalizarcompra', salesFunctions.finalizarCompra);

//Productos
router.get('/catalogo', productController.showCatalogue);

//------------------Funciones de administrador------------------//

router.get('/indexadmin', userFunctions.tokenVerification, adminFunctions.renderAdminView);

router.get('/datatableproductos', productController.listProducts);
router.get('/eliminarproducto/:id', productController.deleteProduct);
router.get('/registroproductos', productController.renderProductsForm);
router.get('/habilitado/:id', productController.updateState);
router.post('/actualizarproducto', productController.updateProductData);
router.post('/nuevoproducto', productController.registerNewProduct);

router.get('/datatableclientes', adminFunctions.listClients);
router.get('/eliminarcliente/:id', adminFunctions.deleteClient);
router.post('/actualizarcliente', adminFunctions.updateClientData);

router.get('/datatablevendedores', vendedoresController.listSellers);
router.get('/registrovendedor', vendedoresController.renderSignupForm);
router.get('/eliminarvendedor/:id', vendedoresController.deleteSeller);
router.post('/nuevovendedor', vendedoresController.registerNewSeller);
router.post('/actualizarvendedor', vendedoresController.updateSellerInfo);

router.get('/datatableventas', adminFunctions.listSales);
router.get('/registroventas', adminFunctions.renderSaleForm);
router.get('/eliminarventa/:id', adminFunctions.deleteSale);
router.post('/finalizarventa', adminFunctions.finishSale);


//Otros
router.get('/excel', routeExcel.descargarExcel);
router.get('/graficos', graphFunctions.renderListGraphs);
router.get('/cantidadventas', graphFunctions.salesQuantity);

module.exports = router