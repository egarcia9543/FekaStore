const cliente = require('../models/clientes')

exports.landing = async (req, res) => {
    res.render('index')
}

exports.registroCliente = async (req, res) => {
    res.render('signup')
}

exports.nuevoCliente = async (req, res) => {
    const nuevoCliente = new cliente ({
        nombre: req.body.nombreCliente,
        cedula: req.body.cedulaCliente,
        telefono: req.body.telefonoCliente,
        ubicacion: {
            centro: [req.body.latitudCliente, req.body.longitudCliente],
        },
        password: req.body.pswdCliente
    });
    await nuevoCliente.save();
    res.redirect('index');
}





exports.mapa = async (req, res) => {
    let clienteU = await cliente.findOne({"cedula": "1010033459"});
    res.render('mapa', {
        "clientes": clienteU
    })
}

//Libreria nodemail
//Autenticacion 2 pasos gmail
//