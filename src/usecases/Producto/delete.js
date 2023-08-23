const productData = require("../../data/productos.data");

exports.deleteProduct = async (productId) => {
  await productData.deleteById(productId);
  return;
};
