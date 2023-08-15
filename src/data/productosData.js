const productos = require('../models/productos')

exports.create = async (data) => {
    return await productos.create(data);
}

exports.findByReferencia = async (referencia) => {
    return await productos.findOne({referencia});
}

exports.findAll = async() => {
    return await productos.find();
}

exports.findEnabled = async() => {
    return await productos.find({habilitado: true});
}

exports.findById = async(id) => {
    return await productos.findById(id);
}

exports.saveChanges = async (product) => {
    return await product.save()
}

exports.updateById = async(id, data) => {
    return await productos.findByIdAndUpdate(id, data);
}

exports.deleteById = async(id) => {
    return await productos.findByIdAndDelete(id);
}
