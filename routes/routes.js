const express = require('express');
const routeController = require('../controller/functions')
const routeExcel = require('../controller/excelfornode')
const routeGraficos = require('../controller/graficos')

const router = express.Router();


//Clientes
router.get('/registroclientes', routeController.registroCliente);
router.post('/nuevocliente', routeController.nuevoCliente);
router.post('/login', routeController.loginCliente)

router.get('/test', routeController.tokenVerification)

router.get('/mapa', routeController.mapa);
router.get('/index', routeController.landing);



router.get('/contact', routeController.contacto)
router.get('/email', routeController.sendEmail)



//Productos
router.get('/registroproductos', routeController.registroProducto);
router.post('/nuevoproducto', routeController.nuevoProducto);
router.get('/catalogo', routeController.catalogo);
router.post('/addtocart', routeController.addCart);
router.get('/excel', routeExcel.descargarExcel)
router.get('/graficos', routeGraficos.graficos)

module.exports = router