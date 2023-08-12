const cliente = require('../models/clientes');
const usuarios = require('../models/usuarios');
const vendedores = require('../models/vendedores')
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ventas = require('../models/ventas');
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

    const clienteRegistrado = await cliente.findOne({ email });
    const usuarioRegistrado = await usuarios.findOne({ email })

    try {
        if (!email || !password) {
            return res.json({
                message: 'Por favor ingrese todos los campos'
            });
        }

        if (clienteRegistrado || usuarioRegistrado) {
            return res.json({
                message: 'El correo ya existe, inicia sesión'
            });
        }

        if (password.length < 8) {
            return res.json({
                message: 'Ingresa una contraseña de 8 caracteres'
            })
        }

        const nuevoCliente = new cliente({
            nombre: req.body.nombreCliente,
            email: email,
            telefono: req.body.telefonoCliente,
            ubicacion: {
                centro: [req.body.latitudCliente, req.body.longitudCliente],
            },
            password: passwordEncriptada,
        })
        await nuevoCliente.save();
        const usuarioTipoCliente = new usuarios({
            email: nuevoCliente.email,
            password: nuevoCliente.password,
            rol: 'cliente'
        })
        await usuarioTipoCliente.save();
        const token = jwt.sign({ id: nuevoCliente._id }, secret, { expiresIn: expires, });
        res.cookie('token', token).redirect('perfil');

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'egarcia9543@misena.edu.co',
                pass: `${process.env.GPASS}`
            }
        });

        let mailOptions = {
            from: 'egarcia9543@misena.edu.co',
            to: email,
            subject: 'Confirmación de Registro',
            text: `¡Hola, ${nuevoCliente.nombre}! Gracias por registrarte en nuestra tienda`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                res.redirect('index')
            }
        });
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
        const usuarioRegistrado = await usuarios.findOne({ email: req.body.emailLogin });
        if (!usuarioRegistrado) {
            return res.json({ error: 'Este usuario no existe' });
        }
        if (usuarioRegistrado.rol == 'cliente') {
            const clienteRegistrado = await cliente.findOne({ email: req.body.emailLogin });
            const passwordCorrecta = await bcrypt.compare(password, usuarioRegistrado.password);
            if (passwordCorrecta) {
                const token = jwt.sign({ id: clienteRegistrado._id }, secret, { expiresIn: expires });
                return res.cookie('token', token).redirect('perfil');
            } else {
                return res.json({ error: 'Contraseña incorrecta' });
            }
        } else if (usuarioRegistrado.rol == 'vendedor') {
            const vendedorRegistrado = await vendedores.findOne({ correo: req.body.emailLogin });
            const passwordCorrecta = await bcrypt.compare(password, usuarioRegistrado.password);
            if (passwordCorrecta) {
                const token = jwt.sign({ id: vendedorRegistrado._id }, secret, { expiresIn: expires });
                return res.cookie('token', token).redirect('indexadmin');
            } else {
                return res.json({ error: 'Contraseña incorrecta' });
            }
        } else {
            return res.json({ error: 'No tienes autorización para acceder a este sitio' });
        }
    } catch (err) {
        console.log(err)
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
        const clienteLogeado = await cliente.findById({ '_id': req.id })
        const ventasRealizadas = await ventas.find({cliente: clienteLogeado.email})
        if (!ventasRealizadas) {
            res.render('perfil', {
                "perfilCliente": clienteLogeado,
            })
        } else {
            res.render('perfil', {
                "perfilCliente": clienteLogeado,
                "ventas": ventasRealizadas
            })
        }
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

exports.sendEmail = async (req, res) => {
    const nuevaContrasena = Math.random().toString(36).slice(-8);
    const passwordEncriptada = await bcrypt.hash(nuevaContrasena, 12);
    const clienteRecuperando = await usuarios.findOneAndUpdate({ "email": req.body.emailAddress }, { "password": passwordEncriptada });
    console.log(clienteRecuperando)

    if (!clienteRecuperando) {
        return res.json({ error: 'Este usuario no existe' });
    } else {
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
            text: `Hola, recibimos tu solicitud para recuperar tu contraseña, aquí tienes una nueva, recuerda cambiarla: ${nuevaContrasena}` //texto del correo
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                res.redirect('index')
            }
        });
        return res.redirect('signin');
    }
}

exports.actualizarPerfil = async (req, res) => {
    const infoCliente = await cliente.findById(req.body.idCliente);
    await cliente.findByIdAndUpdate(req.body.idCliente, {
        nombre: req.body.nombreCliente,
        email: req.body.emailCliente,
        telefono: req.body.telefonoCliente
    });
    await usuarios.findOneAndUpdate({ email: infoCliente.email }, {
        email: req.body.emailCliente,
    })
    res.redirect('/store/v1/perfil');
}