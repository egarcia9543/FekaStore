const sellerData = require("../../data/vendedores.data");
const userData = require("../../data/usuarios.data");

exports.deleteSeller = async (sellerId) => {
  const seller = await sellerData.findById(sellerId);
  await userData.deleteByEmail(seller.correo);
  await sellerData.deleteById(sellerId);
};
