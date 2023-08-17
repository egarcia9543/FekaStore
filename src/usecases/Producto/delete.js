const productData = require("../../data/productosData");

exports.deleteProduct = async (productId) => {
  await productData.deleteById(productId);
  return;
};
