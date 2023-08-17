const express = require('express');

const routeExcel = require('../controller/excelfornode')
const userFunctions = require('../controller/usuario')
const graphFunctions = require('../controller/graficos')
const adminFunctions = require('../controller/admin')
const salesFunctions = require('../controller/ventas')

const productController = require('../controller/productosController');
const vendedoresController = require('../controller/vendedoresController');
const clientesController = require('../controller/clientesController');
const usuariosController = require('../controller/usuariosController');
const ventasController = require('../controller/ventasController');

const router = express.Router();

//----------Render landing page------------//
router.get('/index', clientesController.renderLandingPage);

//-----------------Funciones de usuario---------------------- //
router.get('/registroclientes', clientesController.renderSignupForm);
router.get('/signin', clientesController.renderLoginForm);
router.get('/recuperar', clientesController.renderRecoverForm);

router.get('/perfil', usuariosController.tokenVerification, clientesController.viewProfile);
router.get('/logout', usuariosController.logout);
router.post('/editarperfil', clientesController.editProfile);
router.post('/nuevocliente', clientesController.registerNewClient);
router.post('/login', usuariosController.login);





router.post('/finrecuperacion', usuariosController.recoverPassword)

//Ventas
router.get('/compra', salesFunctions.verificarUsuario);
router.post('/finalizarcompra', ventasController.registerSale);

//Productos
router.get('/catalogo', productController.showCatalogue);

//------------------Funciones de administrador------------------//

router.get('/indexadmin', usuariosController.tokenVerification, vendedoresController.viewSellerProfile);

router.get('/datatableproductos', productController.listProducts);
router.get('/eliminarproducto/:id', productController.deleteProduct);
router.get('/registroproductos', productController.renderProductsForm);
router.get('/habilitado/:id', productController.updateState);
router.post('/actualizarproducto', productController.updateProductData);
router.post('/nuevoproducto', productController.registerNewProduct);

router.get('/datatableclientes', clientesController.listClients);
router.get('/eliminarcliente/:id', clientesController.deleteClient);
router.post('/actualizarcliente', clientesController.updateClientInfo);

router.get('/datatablevendedores', vendedoresController.listSellers);
router.get('/registrovendedor', vendedoresController.renderSignupForm);
router.get('/eliminarvendedor/:id', vendedoresController.deleteSeller);
router.post('/nuevovendedor', vendedoresController.registerNewSeller);
router.post('/actualizarvendedor', vendedoresController.updateSellerInfo);

router.get('/datatableventas', adminFunctions.listSales);
router.get('/registroventas', adminFunctions.renderSaleForm);
router.get('/eliminarventa/:id', adminFunctions.deleteSale);
router.post('/finalizarventa', vendedoresController.registerSale);


//Otros
router.get('/excel', routeExcel.descargarExcel);
router.get('/graficos', graphFunctions.renderListGraphs);
router.get('/cantidadventas', graphFunctions.salesQuantity);

module.exports = router