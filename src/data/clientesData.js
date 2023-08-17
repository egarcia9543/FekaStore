const clientes = require('../models/clientes');

exports.create = async (data) => {
    return await clientes.create(data);
}

exports.findAll = async () => {
    return await clientes.find();
}

exports.findById = async (id) => {
    return await clientes.findById(id);
}

exports.findByEmail = async (email) => {
    return await clientes.findOne({email});
}

exports.updateById = async (id, clientData) => {
    return await clientes.findByIdAndUpdate(id, clientData);
}

exports.findByEmailAndUpdate = async (email, clientData) => {
    return await clientes.findOneAndUpdate({email}, clientData);
}

exports.saveChanges = async (client) => {
    return await client.save();
}

exports.deleteById = async (id) => {
    return await clientes.findByIdAndDelete(id);
}