const productData = require("../../data/productos.data");

exports.listCatalogue = async () => {
  return await productData.findEnabled();
};
