const express = require('express');
const userFunctions = require('../controller/usuario')
const routeExcel = require('../controller/excelfornode')
const routeGraficos = require('../controller/graficos')
const productFunctions = require('../controller/productos')
const adminFunctions = require('../controller/admin')


const router = express.Router();


//Clientes
router.get('/registroclientes', userFunctions.registroCliente);
router.post('/nuevocliente', userFunctions.nuevoCliente);
router.post('/login', userFunctions.loginCliente)

router.get('/test', userFunctions.tokenVerification)

router.get('/mapa', userFunctions.mapa);
router.get('/index', userFunctions.landing);



router.get('/recuperar', userFunctions.contacto)
router.post('/email', userFunctions.sendEmail)



//Productos
router.get('/registroproductos', productFunctions.registroProducto);
router.post('/nuevoproducto', productFunctions.nuevoProducto);
router.get('/catalogo', productFunctions.catalogo);

//Admin
router.get('/indexadmin', adminFunctions.landingAdmin);
router.get('/datatableproductos', adminFunctions.listOfProducts);
router.get('/datatableclientes', adminFunctions.listOfClients);

//Otros
router.get('/excel', routeExcel.descargarExcel)
router.get('/graficos', routeGraficos.graficos)

module.exports = router