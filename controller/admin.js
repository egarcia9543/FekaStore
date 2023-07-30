const producto = require('../models/productos');
const usuarios = require('../models/usuarios')
const vendedor = require('../models/vendedores');
const cliente = require('../models/clientes')
const bcrypt = require('bcrypt');


exports.landingAdmin =  (req, res) => {
    res.render('admin/index')
};

exports.listOfProducts = async (req, res) => {
    let productos = await producto.find();
    res.render('admin/listOfProducts', {
        "productos": productos
    });
};

exports.listOfClients = async (req, res) => {
    let clientes = await cliente.find();
    res.render('admin/listOfClients', {
        "clientes": clientes
    });
};

exports.vendedorRegistro = (req, res) => {
    res.render('admin/formularioRegistroVendedor');
}

exports.nuevoVendedor = async(req, res) => {
    const email = req.body.emailVendedor;
    const password = req.body.pswdVendedor
    const passwordEncriptada = await bcrypt.hash(req.body.pswdVendedor, 12)
    
    const vendedorRegistrado = await vendedor.findOne({email});
    
    try {
        if (!email || !password) {
            return res.json({
                message: 'Por favor ingrese todos los campos'
            });
        }
        if (vendedorRegistrado) {
            return res.json({
                message: 'Este correo ya está registrado'
            });
        }
        
        const nuevoVendedor = new vendedor({
            nombreCompleto: req.body.nombreVendedor,
            documento: req.body.documentoVendedor,
            correo: email,
            password: passwordEncriptada
        });
        await nuevoVendedor.save();
        
        const usuarioTipoVendedor = new usuarios({
            email: nuevoVendedor.correo,
            password: nuevoVendedor.password,
            rol: 'vendedor'
        });
        await usuarioTipoVendedor.save();
        res.redirect('/store/v1/datatablevendedores')

    } catch (error) {
        return res.json({error: error})
    }
}

exports.listOfWorkers = async (req, res) => {
    let vendedores = await vendedor.find();
    res.render('admin/listOfWorkers', {
        "vendedores": vendedores
    });
};

exports.actualizarHabilitado = async (req, res) => {
    let estadoProducto = await producto.findById(req.params.id);
    estadoProducto.habilitado = !estadoProducto.habilitado;
    await estadoProducto.save();
    res.redirect('/store/v1/datatableproductos');
};

exports.actualizarDataProducto = async (req, res) => {
    await producto.findByIdAndUpdate(req.body.id, {
        referencia: req.body.referencia,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        stock: req.body.stock,
        precio: req.body.precio,
    });
    res.redirect('/store/v1/datatableproductos');
};

exports.actualizarInfoClientes = async (req, res) => {
    await cliente.findByIdAndUpdate(req.body.idCliente, {
        nombre: req.body.nombreCliente,
        email: req.body.emailCliente,
        telefono: req.body.telefonoCliente
    });
    await usuarios.findOneAndUpdate({email: req.body.emailCliente}, {
        email: req.body.emailCliente,
    })
    res.redirect('/store/v1/datatableclientes');
}

exports.eliminarCliente = async (req, res) => {
    await cliente.findByIdAndDelete({'_id': req.params.id});
    res.redirect('/store/v1/datatableclientes');
    // await usuarios.findOneAndDelete({})
    // await cliente.findByIdAndDelete({"_id": req.params.id});
}

// Cliente se registra e ingresa a hacer una compra de tres productos => resultado: cliente almacenado, compra registrada