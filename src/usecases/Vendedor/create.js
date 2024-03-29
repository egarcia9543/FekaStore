const sellerData = require("../../data/vendedores.data");
const userData = require("../../data/usuarios.data");
const bcrypt = require("bcrypt");

exports.createNewSeller = async (sellerInfo) => {
  const {nombreVendedor, documentoVendedor, emailVendedor, pswdVendedor} = sellerInfo;
  const passwordEncrypted = await bcrypt.hash(pswdVendedor, 12);

  const emailRegistered = await sellerData.findByEmail(emailVendedor);
  const documentRegistered = await sellerData.findByDocument(documentoVendedor);
  const userRegistered = await userData.findByEmail(emailVendedor);

  if (!emailVendedor || !pswdVendedor || !documentoVendedor || !nombreVendedor) {
    return {error: "Faltan datos"};
  }

  if (emailRegistered || documentRegistered || userRegistered) {
    return {error: "El email o documento ya existe"};
  }

  const newSeller = {
    nombreCompleto: nombreVendedor,
    documento: documentoVendedor,
    email: emailVendedor,
    password: passwordEncrypted,
  };
  await sellerData.createSeller(newSeller);

  const newUser = {
    email: emailVendedor,
    password: passwordEncrypted,
    rol: "vendedor",
  };
  await userData.createUser(newUser);
  return {message: "Vendedor creado"};
};
