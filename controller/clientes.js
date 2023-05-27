const cliente = require('../models/clientes')

exports.landing = async (req, res) => {
    res.render('index')
}

exports.listaCliente = async (req, res) => {
    res.render('userCrud');
}

exports.mapa = async (req, res) => {
    let clienteU = await cliente.findOne({"cedula": "1011391910"});
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
            centro: [req.body.ubicacionLat, req.body.ubicacionLon],
            zoom: 20
        },
        totalComprado: req.body.totalCompradoCliente
    });
    await nuevoCliente.save();
    res.redirect('userCrud');
}