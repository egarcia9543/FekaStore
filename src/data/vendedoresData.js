const vendedores = require("../models/vendedores");

exports.createSeller = async (sellerData) => {
  return await vendedores.create(sellerData);
};

exports.findAll = async () => {
  return await vendedores.find();
};

exports.findByEmail = async (email) => {
  return await vendedores.findOne({email});
};

exports.findById = async (id) => {
  return await vendedores.findById(id);
};

exports.findByDocument = async (documento) => {
  return await vendedores.findOne({documento});
};

exports.updateById = async (id, sellerData) => {
  return await vendedores.findByIdAndUpdate(id, sellerData);
};

exports.saveChanges = async (seller) => {
  return await seller.save();
};

exports.deleteById = async (id) => {
  return await vendedores.findByIdAndDelete(id);
};
