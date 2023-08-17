const productData = require("../../data/productosData");

exports.listCatalogue = async () => {
  return await productData.findEnabled();
};
