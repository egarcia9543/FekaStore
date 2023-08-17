const productData = require("../../data/productosData");
const sellerData = require("../../data/vendedoresData");
const jwt = require("jsonwebtoken");

exports.generateForm = async (token) => {
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const seller = await sellerData.findById(decodedToken.id);
  if (!seller) {
    return {error: "El vendedor no existe"};
  }
  const products = await productData.findEnabled();
  return {seller, products};
};
