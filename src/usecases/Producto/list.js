const productData = require("../../data/productos.data");

exports.listAllProducts = async () => {
  return await productData.findAll();
};
