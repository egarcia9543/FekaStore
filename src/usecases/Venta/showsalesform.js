/* eslint-disable no-undef */
const productData = require("../../data/productos.data");
const sellerData = require("../../data/vendedores.data");
const jwt = require("jsonwebtoken");

exports.generateForm = async (token) => {
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const seller = await sellerData.findById(decodedToken.id);
  if (!seller) {
    return {error: "No hay una sesión de vendedor activa"};
  }
  const products = await productData.findEnabled();
  return {seller, products};
};
