const clientes = require('../models/clientes');

exports.create = async (data) => {
    return await clientes.create(data);
}

exports.findByEmail = async (email) => {
    return await clientes.findOne({email});
}

exports.updateById = async (id, clientData) => {
    return await clientes.findByIdAndUpdate(id, clientData);
}

exports.saveChanges = async (client) => {
    return await client.save();
}