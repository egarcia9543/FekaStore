const ventas = require('../models/ventas');

exports.create = async (data) => {
    return await ventas.create(data);
}

exports.findAll = async () => {
    return await ventas.find();
}

exports.findById = async (id) => {
    return await ventas.findById(id);
}

exports.findByClient = async (clientEmail) => {
    return await ventas.find({cliente: clientEmail});
}

exports.deleteById = async (id) => {
    return await ventas.findByIdAndDelete(id);
}