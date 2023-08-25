const createClientUsecae = require("../usecases/Cliente/create");
const listClientUsecase = require("../usecases/Cliente/list");
const updateClientUsecase = require("../usecases/Cliente/update");
const deleteClientUsecase = require("../usecases/Cliente/delete");
const viewProfileUsecase = require("../usecases/Cliente/viewprofile");
const getuser = require("../usecases/Usuario/getinfo");
const getseller = require("../usecases/Vendedor/viewprofile");

exports.renderLandingPage = (req, res) => {
  res.render("index");
};

exports.renderSignupForm = (req, res) => {
  res.render("signup");
};

exports.renderLoginForm = async (req, res) => {
  res.render("signin");
};

exports.renderRecoverForm = (req, res) => {
  res.render("formularioRecuperacion");
};

exports.registerNewClient = async (req, res) => {
  try {
    const {token, error} = await createClientUsecae.createNewClient(req.body);
    if (error) {
      return res.render("signup", {
        error: error,
      });
    }
    return res.cookie("token", token).redirect("perfil");
  } catch (error) {
    console.error(error);
    return res.render("error500", {
      error: "Error al registrar el cliente",
    });
  }
};

exports.listClients = async (req, res) => {
  try {
    const seller = await getseller.getSeller(req.id);
    if (!seller) {
      return res.render("error401", {
        error: "No puedes acceder a este sitio",
      });
    }
    const user = await getuser.getUser(seller.email);
    const resultado = await listClientUsecase.listAllClients();
    if (!resultado) {
      return res.render("error404", {
        error: "No hay clientes registrados",
      });
    }
    return res.render("admin/listOfClients", {
      "clientes": resultado,
      "user": user.rol,
      "vendedor": seller,
    });
  } catch (error) {
    console.error(error);
    return res.render("error500", {
      error: "Error al listar los clientes",
    });
  }
};

exports.viewProfile = async (req, res) => {
  try {
    const resultado = await viewProfileUsecase.getClient(req.id);
    if (resultado.seller) {
      return res.render("admin/index", {
        "vendedor": resultado.seller,
      });
    }
    if (resultado.error) {
      return res.render("error400", {
        error: resultado.error,
      });
    }
    return res.render("perfil", {
      "perfilCliente": resultado.client,
      "ventas": resultado.sales,
    });
  } catch (error) {
    console.error(error);
    return res.render("error500", {
      error: "Error al listar el perfil",
    });
  }
};

exports.editProfile = async (req, res) => {
  try {
    const resultado = await updateClientUsecase.updateClient(req.body);
    if (resultado.error) {
      return res.render("error400", {
        error: resultado.error,
      });
    }
  } catch (error) {
    console.error(error);
    return res.render("error500", {
      error: "Error al actualizar el cliente",
    });
  }
};

exports.updateClientInfo = async (req, res) => {
  try {
    const resultado = await updateClientUsecase.updateClient(req.body);
    if (resultado.error) {
      return res.render("error400", {
        error: resultado.error,
      });
    }
    return res.redirect("/datatableclientes");
  } catch (error) {
    console.error(error);
    return res.render("error500", {
      error: "Error al actualizar el cliente",
    });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    await deleteClientUsecase.deleteClient(req.params.id);
    return res.redirect("/datatableclientes");
  } catch (error) {
    console.error(error);
    return res.render("error500", {
      error: "Error al eliminar el cliente",
    });
  }
};
