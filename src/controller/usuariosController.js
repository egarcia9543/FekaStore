/* eslint-disable no-undef */
const loginUsecase = require("../usecases/Usuario/login");
const recoverUsecase = require("../usecases/Usuario/recover");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const resultado = await loginUsecase.loginUser(req.body.emailLogin, req.body.pwdLogin);
    if (resultado.error) {
      return res.render("signin", {
        error: resultado.error,
      });
    }
    return res.cookie("token", resultado.token).redirect(resultado.path);
  } catch (error) {
    console.error(error);
    return res.render("error500", {
      error: "Error al iniciar sesión",
    });
  }
};

exports.logout = async (req, res) => {
  res.clearCookie("token").redirect("/");
};

exports.tokenVerification = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.redirect("signin");
      return;
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.clearCookie("token").status(401).render("error401", {
          error: "Token inválido",
        });
      }
      req.id = user.id;
      next();
      return;
    });
  } catch (error) {
    console.error(error);
    return res.render("error500", {
      error: "Error al verificar el token",
    });
  }
};

exports.recoverPassword = async (req, res) => {
  try {
    const resultado = await recoverUsecase.recoverPassword(req.body.emailAddress);
    if (resultado.error) {
      return res.render("formularioRecuperacion", {
        error: resultado.error,
      });
    }
    return res.redirect("signin");
  } catch (error) {
    console.error(error);
    return res.render("error500", {
      error: "Error al recuperar contraseña",
    });
  }
};
