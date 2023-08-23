const sellerData = require("../../data/vendedores.data");

exports.getSeller = async (id) => {
  return await sellerData.findById(id);
};
