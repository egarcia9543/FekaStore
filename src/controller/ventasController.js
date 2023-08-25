const createSaleUsecase = require("../usecases/Venta/create");
const listAllSalesUsecase = require("../usecases/Venta/list");
const deleteSaleUsecase = require("../usecases/Venta/delete");
const updateSaleusecase = require("../usecases/Venta/update");
const generateFormUsecase = require("../usecases/Venta/showsalesform");
const verifyUserUsecase = require("../usecases/Venta/userverification");
const getuser = require("../usecases/Usuario/getinfo");
const getseller = require("../usecases/Vendedor/viewprofile");


exports.registerSale = async (req, res) => {
  try {
    const resultado = await createSaleUsecase.createSaleRecord(req.body);
    if (!resultado) {
      return res.render("error400", {
        error: "Error al registrar la venta",
      });
    }
    return res.render("confirmacioncompra");
  } catch (error) {
    console.error(error);
    return res.render("error500", {
      error: "Error al registrar la venta",
    });
  }
};

exports.listSales = async (req, res) => {
  try {
    const seller = await getseller.getSeller(req.id);
    if (!seller) {
      return res.render("error401", {
        error: "No puedes acceder a este sitio",
      });
    }
    const user = await getuser.getUser(seller.email);
    const resultado = await listAllSalesUsecase.listAllSales();
    return res.render("admin/listOfVentas", {
      "ventas": resultado,
      "user": user.rol,
      "vendedor": seller,
    });
  } catch (error) {
    console.error(error);
    return res.render("error500", {
      error: "Error al listar las ventas",
    });
  }
};

exports.updateSale = async (req, res) => {
  try {
    const resultado = await updateSaleusecase.updateSale(req.body);
    if (resultado.error) {
      return res.render("error404", {
        error: resultado.error,
      });
    }
    return res.redirect("/datatableventas");
  } catch (error) {
    console.error(error);
    return res.render("error500", {
      error: "Error al actualizar la venta",
    });
  }
};

exports.deleteSale = async (req, res) => {
  try {
    const resultado = await deleteSaleUsecase.deleteSale(req.params.id);
    if (resultado.error) {
      return res.render("error400", {
        error: resultado.error,
      });
    }
    return res.redirect("/datatableventas");
  } catch (error) {
    console.error(error);
    return res.render("error500", {
      error: "Error al eliminar la venta",
    });
  }
};

exports.saleForm = async (req, res) => {
  try {
    const resultado = await generateFormUsecase.generateForm(req.cookies.token);
    if (resultado.error) {
      return res.render("error401", {
        error: resultado.error,
      });
    }
    return res.render("admin/registrarVenta", {
      "vendedor": resultado.seller,
      "productos": resultado.products,
    });
  } catch (error) {
    console.error(error);
    return res.render("error500", {
      error: "Error al generar el formulario",
    });
  }
};

exports.userTokenVerification = async (req, res) => {
  try {
    const resultado = await verifyUserUsecase.verifyUser(req.cookies.token);
    if (resultado.error) {
      return res.redirect("/signin");
    }
    return res.render("compra", {
      usuario: resultado.cliente,
    });
  } catch (error) {
    console.error(error);
    return res.render("error500", {
      error: "Error al verificar el usuario",
    });
  }
};
