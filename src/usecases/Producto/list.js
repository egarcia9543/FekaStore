const productData = require("../../data/productosData");

exports.listAllProducts = async () => {
  return await productData.findAll();
};
