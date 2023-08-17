const sellerData = require("../../data/vendedoresData");
const userData = require("../../data/usuariosData");

exports.updateSeller = async (sellerInfo) => {
  const {idVendedor, nombreVendedor, documentoVendedor, correoVendedor} = sellerInfo;

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

  const updatedInfo = {
    nombreCompleto: nombreVendedor,
    documento: documentoVendedor,
    email: correoVendedor,
  };

  await sellerData.updateById(idVendedor, updatedInfo);
  await userData.findByEmailAndUpdate(existingSeller.email, {email: correoVendedor});

  return {message: "Vendedor actualizado"};
};
