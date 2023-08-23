/* eslint-disable no-undef */
const userData = require("../../data/usuarios.data");
const clientData = require("../../data/clientes.data");
const sellerData = require("../../data/vendedores.data");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.loginUser = async (email, password) => {
  let token;
  let path;
  const user = await userData.findByEmail(email);
  if (!email || !password) {
    return {error: "Faltan datos"};
  }

  if (!user) {
    return {error: "Este usuario no existe"};
  }

  if (user.rol == "cliente") {
    const client = await clientData.findByEmail(email);
    const passwordCorrect = await bcrypt.compare(password, user.password);
    if (passwordCorrect) {
      token = jwt.sign({id: client._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE});
      path = "perfil";
    } else {
      return {error: "Contraseña incorrecta"};
    }
  } else if (user.rol == "vendedor") {
    const seller = await sellerData.findByEmail(email);
    const passwordCorrect = await bcrypt.compare(password, user.password);
    if (passwordCorrect) {
      token = jwt.sign({id: seller._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE});
      path = "indexadmin";
    } else {
      return {error: "Contraseña incorrecta"};
    }
  }
  return {token, path};
};
