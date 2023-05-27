const express = require('express');
const routeClientes = require('../controller/clientes')

const router = express.Router();

router.get('/clientes', routeClientes.listaCliente);
router.post('/nuevocliente', routeClientes.nuevoCliente);
router.get('/mapa', routeClientes.mapa)


module.exports = router