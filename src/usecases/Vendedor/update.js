const sellerData = require("../../data/vendedores.data");
const userData = require("../../data/usuarios.data");
const bcrypt = require("bcrypt");

exports.updateSeller = async (sellerInfo) => {
  const {idVendedor, nombreVendedor, documentoVendedor, correoVendedor, passwordVendedor} = sellerInfo;

  const existingSeller = await sellerData.findById(idVendedor);
  if (!existingSeller) {
    return {error: "Vendedor no encontrado"};
  }

  if (correoVendedor !== existingSeller.email) {
    const emailRegistered = await sellerData.findByEmail(correoVendedor);
    if (emailRegistered) {
      return {error: "El correo ya está registrado"};
    }
  }
  const documentRegistered = await sellerData.findByDocument(documentoVendedor);
  if (documentRegistered && documentoVendedor !== existingSeller.documento) {
    return {error: "El documento ya está registrado"};
  }

  const updatedInfo = {
    nombreCompleto: nombreVendedor,
    documento: documentoVendedor,
    email: correoVendedor,
  };

  if (passwordVendedor) {
    const passwordEncrypted = await bcrypt.hash(passwordVendedor, 12);
    updatedInfo.password = passwordEncrypted;
  }

  await sellerData.updateById(idVendedor, updatedInfo);
  await userData.findByEmailAndUpdate(existingSeller.email, {email: correoVendedor, password: updatedInfo.password});

  return {message: "Vendedor actualizado"};
};
