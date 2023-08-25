const createSellerUsecase = require("../usecases/Vendedor/create");
const listSellerUsecase = require("../usecases/Vendedor/list");
const updateSellerUsecase = require("../usecases/Vendedor/update");
const deleteSelerUsecase = require("../usecases/Vendedor/delete");
const viewProfileUsecase = require("../usecases/Vendedor/viewprofile");
const createSaleRecord = require("../usecases/Vendedor/registersale");

exports.renderSignupForm = (req, res) => {
  res.render("admin/formularioRegistroVendedor");
};

exports.viewSellerProfile = async (req, res) => {
  try {
    const resultado = await viewProfileUsecase.getSeller(req.id);
    if (!resultado) {
      return res.status(401).render("error401", {
        error: "No puedes acceder a este sitio",
      })
    }
    return res.render("admin/index", {
      "vendedor": resultado,
    });
  } catch (error) {
    console.error(error);
    return res.render("error500", {
      error: "Error al obtener el vendedor",
    });
  }
};

exports.registerNewSeller = async (req, res) => {
  try {
    const resultado = await createSellerUsecase.createNewSeller(req.body);
    if (resultado.error) {
      return res.render("formularioRegistroVendedor", {
        error: resultado.error,
        });
    }
    return res.redirect("/datatablevendedores");
  } catch (error) {
    console.error(error);
    return res.render("error500", {
      error: "Error al registrar el vendedor",
    });
  }
};

exports.listSellers = async (req, res) => {
  try {
    const resultado = await listSellerUsecase.listAllSellers();
    return res.render("admin/listOfWorkers", {
      "vendedores": resultado,
    });
  } catch (error) {
    console.error(error);
    return res.render("error500", {
      error: "Error al listar los vendedores",
    });
  }
};

exports.updateSellerInfo = async (req, res) => {
  try {
    const resultado = await updateSellerUsecase.updateSeller(req.body);
    if (resultado.error) {
      return res.render("error400", {
        error: resultado.error,
      });
    }
    return res.redirect("/datatablevendedores");
  } catch (error) {
    console.error(error);
    return res.render("error500", {
      error: "Error al actualizar el vendedor",
    });
  }
};

exports.deleteSeller = async (req, res) => {
  try {
    await deleteSelerUsecase.deleteSeller(req.params.id);
    return res.redirect("/datatablevendedores");
  } catch (error) {
    console.error(error);
    return res.render("error500", {
      error: "Error al eliminar el vendedor",
    });
  }
};

exports.registerSale = async (req, res) => {
  try {
    const resultado = await createSaleRecord.createSaleRecord(req.body);
    if (resultado.error) {
      return res.render("error400", {
        error: resultado.error,
      });
    }
    return res.redirect("/datatableventas");
  } catch (error) {
    console.error(error);
    return res.render("error500", {
      error: "Error al registrar la venta",
    });
  }
};
