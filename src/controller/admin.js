const producto = require('../models/productos');
const usuarios = require('../models/usuarios');
const vendedor = require('../models/vendedores');
const cliente = require('../models/clientes');
const ventas = require('../models/ventas');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.renderAdminView = async (req, res) => {
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


//---------Funciones CRUD ventas------------//
exports.listSales = async (req, res) => {
    let listaVentas = await ventas.find();
    res.render('admin/listOfVentas', {
        'ventas': listaVentas
    });
}

exports.renderSaleForm = async (req, res) => {
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

exports.finishSale = async (req, res) => {
    const productosVenta = [];
    const productos = await producto.findById({'_id': req.body.productosVenta});
    productosVenta.push({
        id: req.body.productosVenta,
        precio: parseFloat(productos.precio),
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

exports.deleteSale = async (req, res) => {
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
//------------------FIN---------------------//



//--------Funciones CRUD clientes-----------//
exports.listClients = async (req, res) => {
    let clientes = await cliente.find();
    res.render('admin/listOfClients', {
        "clientes": clientes
    });
};

exports.updateClientData = async (req, res) => {
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

exports.deleteClient = async (req, res) => {
    const infoCliente = await  cliente.findById(req.params.id);
    await cliente.findByIdAndDelete({'_id': req.params.id});
    await usuarios.findOneAndDelete({email: infoCliente.email});
    res.redirect('/store/v1/datatableclientes');
}
//-----------------FIN---------------------//


