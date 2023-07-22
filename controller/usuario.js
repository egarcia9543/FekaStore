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
        res.cookie({ 'token': token }).json({ success: true, message: 'Usuario registrado satisfactoriamente', data: clienteRegistrado });

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
            console.log(email, password);
            return res.json({ error: 'Ingresa todas las credenciales' });
        }

        const clienteRegistrado = await cliente.findOne({ email: req.body.emailLogin });
        console.log(clienteRegistrado)
        if (!clienteRegistrado) {
            return res.json({ error: 'Este usuario no existe' });
        }

        const passwordCorrecta = await bcrypt.compare(password, clienteRegistrado.password);
        if (!passwordCorrecta) {
            return res.json({ error: 'Contraseña incorrecta' });
        }
        console.log(email,clienteRegistrado._id, secret, expires)
        // const token = usuario && usuario._id ? jwt.sign({ id: usuario._id }, secret, { expiresIn: '1hr' }) : false;
        const token = await jwt.sign({ id: email }, secret, { expiresIn: expires });
        res.send(token)
        res.cookie( 'token', token, { httpOnly: true });
        res.json({ success: true, message: 'Inicio de sesión exitoso' });

    } catch (err) {
        return res.json({ error: err });
    }
}
// const {email, password} = req.body;
// const email = req.body.emailLogin;
// const password = req.body.pwdLogin;
// const usuario = await cliente.findOne({ email });

// const passwordCorrect = usuario && usuario.password ? await bcrypt.compare(password, usuario.password) : false;
// const token = usuario && usuario._id ? jwt.sign({ id: usuario._id }, secret, { expiresIn: '1hr' }) : false;

// res.cookie('tokenLeandro', token, {
//     httpOnly: true.valueOf,
//     maxAge: 3600,
// })

// try {
//     if (usuario && passwordCorrect) {
//         return res.status(200).json({ message: `Bienvenido ${token}` });
//     } else {
//         return res.status(401).json({ message: 'El correo o la contraseña son incorrectos' });
//     }
// } catch (error) {
//     console.error(error);
// }

// try {
//     if (!usuario) {
//         return res.status(400).json({message: 'El correo no existe'});
//     } var nodemailer = require('nodemailer');

//     const passwordCorrecta = await bcrypt.compare(password, usuario.password);
//     if (!passwordCorrecta) {
//         return res.status(400).json({message: 'Contraseña incorrecta'});
//     }        // const token = usuario && usuario._id ? jwt.sign({ id: usuario._id }, secret, { expiresIn: '1hr' }) : false;


// } catch (error) {

// }


exports.tokenVerification = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({
                error: "No estás autorizado"
            })
            return;
        }
        jwt.verify(token, secret, (err, user) => {
            if (err) {
                return res.status(401).json({
                    message: "Token inválido"
                })
            }
            req.id = user.id
            console.log(req.id)
            next();
            return;
        })

    } catch (error) {

    }
}

exports.userInfo = async (req, res) => {

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