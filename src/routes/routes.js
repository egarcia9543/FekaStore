const express = require("express");
const productController = require("../controller/productosController");
const vendedoresController = require("../controller/vendedoresController");
const clientesController = require("../controller/clientesController");
const usuariosController = require("../controller/usuariosController");
const ventasController = require("../controller/ventasController");

const graphFunctions = require("../controller/graficos");

// eslint-disable-next-line new-cap
const router = express.Router();

router.get("/", clientesController.renderLandingPage);
router.get("/registroclientes", clientesController.renderSignupForm);
router.get("/signin", clientesController.renderLoginForm);
router.get("/recuperar", clientesController.renderRecoverForm);
router.post("/editarperfil", clientesController.editProfile);
router.post("/nuevocliente", clientesController.registerNewClient);

router.get("/perfil", usuariosController.tokenVerification, clientesController.viewProfile);
router.get("/indexadmin", usuariosController.tokenVerification, vendedoresController.viewSellerProfile);
router.get("/logout", usuariosController.logout);
router.post("/login", usuariosController.login);
router.post("/finrecuperacion", usuariosController.recoverPassword);

router.get("/compra", ventasController.userTokenVerification);
router.post("/finalizarcompra", ventasController.registerSale);

router.get("/catalogo", productController.showCatalogue);

router.get("/datatableproductos", productController.listProducts);
router.get("/eliminarproducto/:id", productController.deleteProduct);
router.get("/registroproductos", productController.renderProductsForm);
router.get("/habilitado/:id", productController.updateState);
router.post("/actualizarproducto", productController.updateProductData);
router.post("/nuevoproducto", productController.registerNewProduct);

router.get("/datatableclientes", clientesController.listClients);
router.get("/eliminarcliente/:id", clientesController.deleteClient);
router.post("/actualizarcliente", clientesController.updateClientInfo);

router.get("/datatablevendedores", vendedoresController.listSellers);
router.get("/registrovendedor", vendedoresController.renderSignupForm);
router.get("/eliminarvendedor/:id", vendedoresController.deleteSeller);
router.post("/nuevovendedor", vendedoresController.registerNewSeller);
router.post("/actualizarvendedor", vendedoresController.updateSellerInfo);
router.post("/finalizarventa", vendedoresController.registerSale);

router.get("/datatableventas", ventasController.listSales);
router.get("/registroventas", ventasController.saleForm);
router.get("/eliminarventa/:id", ventasController.deleteSale);

router.get("/graficos", graphFunctions.renderListGraphs);
router.get("/cantidadventas", graphFunctions.salesQuantity);

module.exports = router;
