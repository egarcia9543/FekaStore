const producto = require('../models/productos');
const venta = require('../models/ventas');
const cliente = require('../models/clientes');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET

exports.verificarUsuario = async (req, res) => {
    const token = req.cookies.token;
    jwt.verify(token, secret, async (err, decoded) => {
        if (err) {
            res.redirect('/store/v1/signin');
        } else {
            const id = decoded.id;
            const usuario = await cliente.findById(id);
            res.render('compra', {
                "usuario": usuario
            })
        }
    })
}

exports.actualizarDireccion = async (req, res) => {
    
}

exports.finalizarCompra = async (req, res) => {    
    try {
        let comprador = await cliente.findOne({ email: req.body.emailEnvio });

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

        res.render('confirmacionCompra');

    } catch (error) {
        res.status(500).json({ message: 'Error al procesar la compra' });
    }
}