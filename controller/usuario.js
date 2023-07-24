const cliente = require('../models/clientes')
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { json } = require('express');
const secret = process.env.JWT_SECRET
const expires = process.env.JWT_EXPIRE
//JWT_SECRET = '235fe06beb59e31f0a7f03edce80b19c7ad35b6bd4614f104f6ff9d4fc26f403481526'



exports.landing = (req, res) => {
    res.render('index')
}

exports.registroCliente = (req, res) => {
    res.render('signup')
}

exports.nuevoCliente = async (req, res) => {
    const email = req.body.emailCliente;
    const password = req.body.pswdCliente;
    const passwordEncriptada = await bcrypt.hash(password, 12);

    const userEmail = await cliente.findOne({ email });

    try {
        if (!email || !password) {
            return res.json({
                message: 'Por favor ingrese todos los campos'
            });
        }

        if (userEmail) {
            return res.json({
                message: 'El correo ya existe, inicia sesión'
            });
        }

        const clienteRegistrado = new cliente({
            nombre: req.body.nombreCliente,
            email: email,
            telefono: req.body.telefonoCliente,
            ubicacion: {
                centro: [req.body.latitudCliente, req.body.longitudCliente],
            },
            password: passwordEncriptada
        })
        await clienteRegistrado.save();
        const token = jwt.sign({ id: clienteRegistrado._id }, secret, { expiresIn: expires, });
        res.cookie('token', token).redirect('perfil');

    } catch (error) {
        return res.json({ error: error });
    }
}

exports.renderLogin = async (req, res) => {
    res.render('signin');
}

exports.loginCLiente = async (req, res) => {
    try {
        const email = req.body.emailLogin;
        const password = req.body.pwdLogin;
        if (!email || !password) {
            return res.json({ error: 'Ingresa todas las credenciales' });
        }
        const clienteRegistrado = await cliente.findOne({ email: req.body.emailLogin });
        if (!clienteRegistrado) {
            return res.json({ error: 'Este usuario no existe' });
        }
        const passwordCorrecta = await bcrypt.compare(password, clienteRegistrado.password);
        if (!passwordCorrecta) {
            return res.json({ error: 'Contraseña incorrecta' });
        }
        const token = jwt.sign({ id: clienteRegistrado._id }, secret, { expiresIn: expires });
        return res.cookie( 'token',  token ).redirect('perfil');
        
    } catch (err) {
        return res.json({ error: err });
    }
}

exports.tokenVerification = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.redirect('signin');
            return;
        }
        jwt.verify(token, secret, (err, user) => {
            if (err) {
                return res.status(401).json({
                    message: "Token inválido"
                });
            }
            req.id = user.id
            next();
            return;
        })

    } catch (error) {
        console.log(error)
    }
}

exports.perfilCliente = async (req, res) => {
    try {
        const clienteLogeado = await cliente.findById(req.id);
        res.render('perfil', {
            "perfilCliente": clienteLogeado
        })
    } catch (error) {
        console.log(error)
    }
}

exports.logout = async (req, res) => {
    res.clearCookie('token').redirect('index')
}


exports.mapa = async (req, res) => {
    let clienteU = await cliente.findOne({ "email": "testsena@gmail.com" });
    res.render('mapa', {
        "clientes": clienteU
    })
}

exports.contacto = (req, res) => {
    res.render('formulario')
}

exports.sendEmail = (req, res) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',  //Se define que servicio de correo se va a utilizar para enviar el mensaje
        auth: {
            user: 'egarcia9543@misena.edu.co', //se pone el correo que va a enviar el mensaje
            pass: `${process.env.GPASS}` //Contraseña de aplicación generada
        }
    });

    let mailOptions = {
        from: 'egarcia9543@misena.edu.co', //Correo que va a enviar el mensaje
        to: req.body.emailAddress, //correo que lo va a recibir
        subject: req.body.asunto, //asunto del correo
        text: req.body.mensaje //texto del correo
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.redirect('index')
        }
    });
}