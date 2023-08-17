const sellerData = require("../../data/vendedoresData");

exports.listAllSellers = async () => {
  return await sellerData.findAll();
};
