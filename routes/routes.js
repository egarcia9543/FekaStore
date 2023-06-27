const express = require('express');
const routeController = require('../controller/usuario')
const routeExcel = require('../controller/excelfornode')
const routeGraficos = require('../controller/graficos')
const functionsProducts = require('../controller/productos')

const router = express.Router();


//Clientes
router.get('/registroclientes', routeController.registroCliente);
router.post('/nuevocliente', routeController.nuevoCliente);
router.post('/login', routeController.loginCliente)

router.get('/test', routeController.tokenVerification)

router.get('/mapa', routeController.mapa);
router.get('/index', routeController.landing);



router.get('/recuperar', routeController.contacto)
router.post('/email', routeController.sendEmail)



//Productos
router.get('/registroproductos', functionsProducts.registroProducto);
router.post('/nuevoproducto', functionsProducts.nuevoProducto);
router.get('/catalogo', functionsProducts.catalogo);



//Otros
router.get('/excel', routeExcel.descargarExcel)
router.get('/graficos', routeGraficos.graficos)

module.exports = router