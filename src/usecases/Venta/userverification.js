/* eslint-disable no-undef */
const clientData = require("../../data/clientesData");
const jwt = require("jsonwebtoken");


exports.verifyUser = async (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const cliente = await clientData.findById(decodedToken.id);
    return {cliente};
  } catch (error) {
    return {error: "Token inválido"};
  }
};
