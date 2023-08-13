const express = require('express');

const routeExcel = require('../controller/excelfornode')
const userFunctions = require('../controller/usuario')
const graphFunctions = require('../controller/graficos')
const adminFunctions = require('../controller/admin')
const salesFunctions = require('../controller/ventas')


const router = express.Router();

//----------Render landing page------------//
router.get('/index', userFunctions.landing);

//-----------------Funciones de usuario---------------------- //
router.get('/registroclientes', userFunctions.registroCliente);
router.get('/signin', userFunctions.renderLogin);
router.get('/perfil', userFunctions.tokenVerification, userFunctions.perfilCliente);
router.get('/logout', userFunctions.logout);
router.post('/editarperfil', userFunctions.actualizarPerfil);
router.post('/nuevocliente', userFunctions.nuevoCliente);
router.post('/login', userFunctions.loginCLiente);





router.get('/recuperar', userFunctions.contacto)
router.post('/email', userFunctions.sendEmail)

//Ventas
router.get('/compra', salesFunctions.verificarUsuario);
router.post('/finalizarcompra', salesFunctions.finalizarCompra);

//Productos
router.get('/catalogo', adminFunctions.renderCatalogue);

//------------------Funciones de administrador------------------//

router.get('/indexadmin', userFunctions.tokenVerification, adminFunctions.renderAdminView);

router.get('/datatableproductos', adminFunctions.listProducts);
router.get('/eliminarproducto/:id', adminFunctions.deleteProduct);
router.get('/habilitado/:id', adminFunctions.updateState);
router.get('/registroproductos', adminFunctions.renderProductForm);
router.post('/actualizarproducto', adminFunctions.updateProductData);
router.post('/nuevoproducto', adminFunctions.registerNewProduct);

router.get('/datatableclientes', adminFunctions.listClients);
router.get('/eliminarcliente/:id', adminFunctions.deleteClient);
router.post('/actualizarcliente', adminFunctions.updateClientData);

router.get('/datatablevendedores', adminFunctions.listWorkers);
router.get('/registrovendedor', adminFunctions.renderWorkerSignup);
router.get('/eliminarvendedor/:id', adminFunctions.deleteWorker);
router.post('/nuevovendedor', adminFunctions.registerNewWorker);
router.post('/actualizarvendedor', adminFunctions.updateWorkerData);

router.get('/datatableventas', adminFunctions.listSales);
router.get('/registroventas', adminFunctions.renderSaleForm);
router.get('/eliminarventa/:id', adminFunctions.deleteSale);
router.post('/finalizarventa', adminFunctions.finishSale);


//Otros
router.get('/excel', routeExcel.descargarExcel);
router.get('/graficos', graphFunctions.renderListGraphs);
router.get('/cantidadventas', graphFunctions.salesQuantity);

module.exports = router