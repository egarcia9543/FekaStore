const cliente = require('../models/clientes')

exports.listaCliente = async (req, res) => {
    res.render('userCrud');
}

exports.mapa = async (req, res) => {
    let clienteU = await cliente.findOne({"cedula": "2"});
    res.render('mapa', {
        "clientes": clienteU
    })
}

exports.nuevoCliente = async (req, res) => {
    const nuevoCliente = new cliente ({
        nombre: req.body.nombreCliente,
        cedula: req.body.cedulaCliente,
        telefono: req.body.telefonoCliente,
        ubicacion: {
            longitud: req.body.ubicacionLat,
            latitud: req.body.ubicacionLon
        },
        totalComprado: req.body.totalCompradoCliente
    });
    await nuevoCliente.save();
    res.redirect('userCrud');
}