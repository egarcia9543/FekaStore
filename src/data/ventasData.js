const ventas = require('../models/ventas');

exports.create = async (data) => {
    return await ventas.create(data);
}

exports.findAll = async () => {
    return await ventas.findAll();
}

exports.findById = async (id) => {
    return await ventas.findById(id);
}