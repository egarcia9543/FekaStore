const sellerData = require("../../data/vendedores.data");

exports.listAllSellers = async () => {
  return await sellerData.findAll();
};
