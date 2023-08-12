const express = require('express');

const userFunctions = require('../controller/usuario')
const routeExcel = require('../controller/excelfornode')
const routeGraficos = require('../controller/graficos')
const productFunctions = require('../controller/productos')
const adminFunctions = require('../controller/admin')
const ventasFunctions = require('../controller/ventas')


const router = express.Router();


//Clientes
router.get('/registroclientes', userFunctions.registroCliente);
router.get('/signin', userFunctions.renderLogin);
router.post('/nuevocliente', userFunctions.nuevoCliente);
router.post('/login', userFunctions.loginCLiente);
router.get('/perfil', userFunctions.tokenVerification, userFunctions.perfilCliente);
router.get('/logout', userFunctions.logout);
router.post('/editarperfil', userFunctions.actualizarPerfil);


router.get('/mapa', userFunctions.mapa);
router.get('/index', userFunctions.landing);



router.get('/recuperar', userFunctions.contacto)
router.post('/email', userFunctions.sendEmail)

//Ventas
// router.get('/realizarcompra', ventasFunctions.realizarCompra);
router.get('/compra', ventasFunctions.verificarUsuario);
router.post('/finalizarcompra', ventasFunctions.finalizarCompra);

//Productos
router.get('/registroproductos', productFunctions.registroProducto);
router.post('/nuevoproducto', productFunctions.nuevoProducto);
router.get('/catalogo', productFunctions.catalogo);

//Admin
router.get('/indexadmin', userFunctions.tokenVerification, adminFunctions.landingAdmin);
router.get('/datatableproductos', adminFunctions.listOfProducts);
router.get('/datatableclientes', adminFunctions.listOfClients);
router.get('/datatablevendedores', adminFunctions.listOfWorkers);
router.get('/datatableventas', adminFunctions.listOfVentas);
router.get('/habilitado/:id', adminFunctions.actualizarHabilitado);
router.post('/actualizarproducto', adminFunctions.actualizarDataProducto);
router.get('/eliminarproducto/:id', adminFunctions.eliminarProducto);
router.get('/registrovendedor', adminFunctions.vendedorRegistro);
router.post('/nuevovendedor', adminFunctions.nuevoVendedor);
router.post('/actualizarcliente', adminFunctions.actualizarInfoClientes);
router.get('/eliminarcliente/:id', adminFunctions.eliminarCliente);
router.post('/actualizarvendedor', adminFunctions.actualizarInfoVendedor);
router.get('/eliminarvendedor/:id', adminFunctions.eliminarVendedor);
router.get('/registroventas', adminFunctions.registroVenta);
router.post('/finalizarventa', adminFunctions.finalizarVenta);
router.get('/eliminarventa/:id', adminFunctions.eliminarVenta);


//Otros
router.get('/excel', routeExcel.descargarExcel);
router.get('/graficos', routeGraficos.renderGraficos);
router.get('/cantidadventas', routeGraficos.cantidadVentas);

module.exports = router