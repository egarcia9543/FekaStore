const createProductUsecase = require("../usecases/Producto/create");
const listProductUsecase = require("../usecases/Producto/list");
const catalogueProductUsecase = require("../usecases/Producto/catalogue");
const updateProductUsecase = require("../usecases/Producto/update");
const updateStateProductUsecase = require("../usecases/Producto/state");
const deleteProductUsecase = require("../usecases/Producto/delete");
const getuser = require("../usecases/Usuario/getinfo");
const getseller = require("../usecases/Vendedor/viewprofile");

exports.renderProductsForm = async (req, res) => {
  try {
    const seller = await getseller.getSeller(req.id);
    if (!seller) {
      return res.render("error401", {
        error: "No puedes acceder a este sitio",
      });
    }
    const user = await getuser.getUser(seller.email);
    if (user.rol !== "admin") {
      return res.render("error401", {
        error: "No puedes acceder a este sitio",
      });
    }
    return res.render("registroProductos");
  } catch (error) {
    console.error(error);
    return res.render("error500", {
      error: "Error al acceder al formulario de registro de productos",
    });
  }
};

exports.registerNewProduct = async (req, res) => {
  try {
    const resultado = await createProductUsecase.createNewProduct(req.body);
    if (resultado.error) {
      return res.render("error400", {
        error: resultado.error,
      });
    }
    return res.redirect("/datatableproductos");
  } catch (error) {
    console.error(error);
    return res.render("error500", {
      error: "Error al registrar el producto",
    });
  }
};

exports.listProducts = async (req, res) => {
  try {
    const seller = await getseller.getSeller(req.id);
    const resultado = await listProductUsecase.listAllProducts();
    if (!seller) {
      return res.render("error401", {
        error: "No puedes acceder a este sitio",
      });
    }
    const user = await getuser.getUser(seller.email);
    return res.render("admin/listOfProducts", {
      "productos": resultado,
      "user": user.rol,
      "vendedor": seller,
    });
  } catch (error) {
    console.error(error);
    return res.render("error500", {
      error: "Error al listar los productos",
    });
  }
};

exports.showCatalogue = async (req, res) => {
  try {
    const resultado = await catalogueProductUsecase.listCatalogue();

    const productosPorPagina = 18;
    const paginaActual = parseInt(req.query.page) || 1;
    const inicio = (paginaActual - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;

    const productosEnPagina = resultado.slice(inicio, fin);
    const paginasTotales = Math.ceil(resultado.length / productosPorPagina);
    return res.render("catalogo", {
      productos: productosEnPagina,
      paginasTotales,
      paginaActual,
    });
  } catch (error) {
    console.error(error);
    return res.render("error500", {
      error: "Error al listar los productos",
    });
  }
};

exports.updateProductData = async (req, res) => {
  try {
    const resultado = await updateProductUsecase.updateProduct(req.body);
    if (resultado.error) {
      return res.render("error400", {
        error: resultado.error,
      });
    }
    return res.redirect("/datatableproductos");
  } catch (error) {
    console.error(error);
    return res.render("error500", {
      error: "Error al actualizar el producto",
    });
  }
};

exports.updateState = async (req, res) => {
  try {
    const resultado = await updateStateProductUsecase.changeState(req.params.id);
    if (resultado.error) {
      return res.render("error400", {
        error: resultado.error,
      });
    }
    return res.redirect("/datatableproductos");
  } catch (error) {
    console.error(error);
    return res.render("error500", {
      error: "Error al actualizar el estado del producto",
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await deleteProductUsecase.deleteProduct(req.params.id);
    return res.redirect("/datatableproductos");
  } catch (error) {
    console.error(error);
    return res.render("error500", {
      error: "Error al eliminar el producto",
    });
  }
};


