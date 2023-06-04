const express = require('express');
const routeController = require('../controller/functions')

const router = express.Router();


//Clientes
router.get('/registroclientes', routeController.registroCliente);
router.post('/nuevocliente', routeController.nuevoCliente);
router.post('/login', routeController.loginCliente)

router.get('/test', routeController.tokenVerification)

router.get('/mapa', routeController.mapa);
router.get('/index', routeController.landing);




//Productos
router.get('/registroproductos', routeController.registroProducto);
router.post('/nuevoproducto', routeController.nuevoProducto);
router.get('/catalogo', routeController.catalogo);


module.exports = router