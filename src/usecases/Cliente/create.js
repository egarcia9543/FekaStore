const clientData = require("../../data/clientesData");
const userData = require("../../data/usuariosData");
const sendEmail = require("../../utils/emailService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createNewClient = async (clientInfo) => {
  const {nombreCliente, emailCliente, telefonoCliente, pswdCliente, latitudCliente, longitudCliente} = clientInfo;
  const passwordEncrypted = await bcrypt.hash(pswdCliente, 12);

  const emailRegistered = await clientData.findByEmail(emailCliente);
  const userRegistered = await userData.findByEmail(emailCliente);

  if (emailRegistered || userRegistered) {
    return {error: "El email ya está registrado"};
  }

  const newClient = {
    nombre: nombreCliente,
    email: emailCliente,
    telefono: telefonoCliente,
    ubicacion: {
      centro: [latitudCliente, longitudCliente],
    },
    password: passwordEncrypted,
  };
  const client = await clientData.create(newClient);

  const newUser = {
    email: emailCliente,
    password: passwordEncrypted,
    rol: "cliente",
  };
  await userData.createUser(newUser);

  await sendEmail.sendEmail(
      emailCliente,
      "Confirmación de Registro",
      "Bienvenido a la tienda en línea más top de todo el mundo",
  );

  const token = jwt.sign({id: client._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE});
  return {token};
};
