const producto = require('../models/productos');
const venta = require('../models/ventas');
const cliente = require('../models/clientes');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const usuario = require('../models/usuarios');
const { json } = require('express');
const secret = process.env.JWT_SECRET

exports.verificarUsuario = async (req, res) => {
    const token = req.cookies.token;
    jwt.verify(token, secret, async (err, decoded) => {
        if (err) {
            res.redirect('/store/v1/signin');
        } else {
            const id = decoded.id;
            const infoUsuario = await usuario.findById(id);
            const infoCliente = await cliente.findOne({email: infoUsuario.email});
            res.render('compra', {
                "usuario": infoCliente
            });
        }
    })
}

exports.actualizarDireccion = async (req, res) => {
    
}

exports.finalizarCompra = async (req, res) => {    
    try {
        let comprador = await cliente.findOne({ email: req.body.emailEnvio });
        let carrito = JSON.parse(req.body.listaDeProductos);
        const registroVenta = new venta({
            productosVenta: carrito,
            subtotal: req.body.subtotalVenta,
            fechaVenta: new Date(),
            impuesto: 19,
            totalVenta: (req.body.subtotalVenta * 1.19).toFixed(2),
            cliente: comprador.nombre,
            vendedor: 'portal'
        });
        await registroVenta.save();
        
        const fechaVenta = new Date();
        comprador.historialCompras.push(fechaVenta);

        comprador.totalComprado += parseFloat(req.body.subtotalVenta);

        await comprador.save();
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'egarcia9543@misena.edu.co',
                pass: `${process.env.GPASS}`
            }
        });
    
        let mailOptions = {
            from: 'egarcia9543@misena.edu.co',
            to: req.body.emailEnvio , 
            subject: 'Confirmación de compra', 
            text: 'Gracias por confiar en nosotros, tu compra llegará en 2 días.' 
        };
    
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                res.redirect('index')
            }
        });

        res.render('confirmacioncompra');

    } catch (error) {
        res.status(500).json({ message: 'Error al procesar la compra' });
    }
}