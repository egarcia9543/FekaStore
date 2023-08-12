const producto = require('../models/productos');
const usuarios = require('../models/usuarios');
const vendedor = require('../models/vendedores');
const cliente = require('../models/clientes');
const ventas = require('../models/ventas');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.landingAdmin = async (req, res) => {
    const vendedorLogueado = await vendedor.findById({'_id': req.id})
    if (!vendedorLogueado){
        return res.json({
            Error: 'No tienes permiso'
        })
    }
    res.render('admin/index', {
        'vendedor': vendedorLogueado
    });
};

exports.listOfProducts = async (req, res) => {
    let productos = await producto.find();
    if (productos.cantidad < 1) {
        productos.habilitado = false
    } else {
        productos.habilitado = true
    }
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
    
    const emailRegistrado = await vendedor.findOne({email});
    const usuarioRegistrado = await usuarios.findOne({email});
    const documentoRegistrado = await vendedor.findOne({documento: req.body.documentoVendedor});
    
    try {
        if (!email || !password) {
            return res.json({
                Error: 'Por favor ingrese todos los campos'
            });
        }
        if (emailRegistrado || documentoRegistrado || usuarioRegistrado) {
            return res.json({
                Error: 'Este correo o documento ya está registrado'
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

exports.listOfVentas = async (req, res) => {
    let listaVentas = await ventas.find();
    res.render('admin/listOfVentas', {
        'ventas': listaVentas
    });
}

exports.actualizarHabilitado = async (req, res) => {
    let estadoProducto = await producto.findById(req.params.id);
    if (estadoProducto.stock < 1) {
        return res.json({Error: 'No hay stock para habilitar este producto'});
    } 
    estadoProducto.habilitado = !estadoProducto.habilitado;
    await estadoProducto.save();
    res.redirect('/store/v1/datatableproductos');
};

exports.actualizarDataProducto = async (req, res) => {
    const stock = req.body.stock;
    let habilitado;
    if (stock < 1) {
        habilitado = false
    } else {
        habilitado = true
    }
    await producto.findByIdAndUpdate(req.body.id, {
        referencia: req.body.referencia,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        stock: req.body.stock,
        precio: req.body.precio,
        habilitado: habilitado
    });
    res.redirect('/store/v1/datatableproductos');
};

exports.eliminarProducto = async (req, res) => {
    await producto.findByIdAndDelete({'_id': req.params.id});
    res.redirect('/store/v1/datatableproductos');
};

exports.actualizarInfoClientes = async (req, res) => {
    const infoCliente = await cliente.findById(req.body.idCliente);
    await cliente.findByIdAndUpdate(req.body.idCliente, {
        nombre: req.body.nombreCliente,
        email: req.body.emailCliente,
        telefono: req.body.telefonoCliente
    });
    await usuarios.findOneAndUpdate({email: infoCliente.email}, {
        email: req.body.emailCliente,
    })
    res.redirect('/store/v1/datatableclientes');
}

exports.eliminarCliente = async (req, res) => {
    const infoCliente = await  cliente.findById(req.params.id);
    await cliente.findByIdAndDelete({'_id': req.params.id});
    await usuarios.findOneAndDelete({email: infoCliente.email});
    res.redirect('/store/v1/datatableclientes');
}

exports.actualizarInfoVendedor = async (req, res) => {
    const infoVendedor = await vendedor.findById(req.body.idVendedor);
    await vendedor.findByIdAndUpdate(req.body.idVendedor, {
        nombreCompleto: req.body.nombreVendedor,
        documento: req.body.documentoVendedor,
        correo: req.body.correoVendedor
    })
    await usuarios.findOneAndUpdate({email: infoVendedor.correo}, {
        email: req.body.correoVendedor
    })
    res.redirect('/store/v1/datatablevendedores');
}

exports.eliminarVendedor = async (req, res) => {
    const infoVendedor = await vendedor.findById(req.params.id);
    await usuarios.findOneAndDelete({email: infoVendedor.correo});
    await vendedor.findByIdAndDelete({'_id': req.params.id});
    res.redirect('/store/v1/datatablevendedores');
}

exports.registroVenta = async (req, res) => {
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    const vendedorLogueado = await vendedor.findById({'_id': decoded.id});
    const listaProductos = await producto.find();
    const listaClientes = await cliente.find();
    res.render('admin/registrarVenta', {
        'vendedor': vendedorLogueado,
        'productos': listaProductos,
        'clientes': listaClientes
    });
}

exports.finalizarVenta = async (req, res) => {
    const productosVenta = [];
    const productos = await producto.findById({'_id': req.body.productosVenta});
    productosVenta.push({
        id: req.body.productosVenta,
        precio: productos.precio,
        nombre: productos.nombre,
        imagen: productos.imagen,
        cantidad: 1
    })
    productos.stock -= 1;
    await productos.save();

    const clienteVenta = await cliente.findOne({email: req.body.cliente});
    if (!clienteVenta) {
        return res.json({Error: 'Este cliente no está registrado'});
    }
    clienteVenta.historialCompras.push(req.body.fechaVenta);
    clienteVenta.totalComprado += parseFloat(req.body.totalVenta);
    await clienteVenta.save();

    const vendedorVenta = await vendedor.findOne({email: req.body.vendedor});
    vendedorVenta.ventasDespachadas.push({
        productosVenta: productos.nombre,
        totalVenta: req.body.totalVenta,
        fechaVenta: req.body.fechaVenta,
    });
    await vendedorVenta.save();

    const nuevaVenta = new ventas({
        productosVenta: productosVenta,
        subtotal: req.body.subtotal,
        fechaVenta: req.body.fechaVenta,
        impuesto: req.body.impuesto,
        totalVenta: req.body.totalVenta,
        cliente: clienteVenta.email,
        vendedor: vendedorVenta.correo
    });
    await nuevaVenta.save();
    res.redirect('/store/v1/datatableventas');
}

exports.eliminarVenta = async (req, res) => {
    const infoVenta = await ventas.findById(req.params.id);
    const productosVenta = infoVenta.productosVenta;
    for (let i = 0; i < productosVenta.length; i++) {
        const productoComprado = await producto.findById(productosVenta[i].id);
        productoComprado.stock += 1;
        await productoComprado.save();
    }

    const clienteVenta = await cliente.findOne({email: infoVenta.cliente});
    clienteVenta.historialCompras.pop();
    clienteVenta.totalComprado -= parseFloat(infoVenta.totalVenta);
    await clienteVenta.save();

    const vendedorVenta = await vendedor.findOne({correo: infoVenta.vendedor});
    vendedorVenta.ventasDespachadas.pop();
    await vendedorVenta.save();

    await ventas.findByIdAndDelete({'_id': req.params.id});
    res.redirect('/store/v1/datatableventas');
}