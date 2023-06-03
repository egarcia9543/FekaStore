const express = require('express');
const routeClientes = require('../controller/functions')

const router = express.Router();


//Clientes
router.get('/registroclientes', routeClientes.registroCliente);
router.post('/nuevocliente', routeClientes.nuevoCliente);
router.post('/login', routeClientes.loginCliente)

router.get('/mapa', routeClientes.mapa);
router.get('/index', routeClientes.landing);




//Productos
router.get('/registroproductos', routeClientes.registroProducto);
router.post('/nuevoproducto', routeClientes.nuevoProducto);
router.get('/catalogo', routeClientes.catalogo);


module.exports = router