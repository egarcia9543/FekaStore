const cliente = require('../models/clientes')
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret = process.env.jwtSecret
//jwtSecret = '235fe06beb59e31f0a7f03edce80b19c7ad35b6bd4614f104f6ff9d4fc26f403481526'



exports.landing = async (req, res) => {
    res.render('index')
}

exports.registroCliente = async (req, res) => {
    res.render('signup')
}

exports.nuevoCliente = async (req, res, next) => {
    const email = req.body.emailCliente;
    const password = req.body.pswdCliente;
    const hashedPassword = await bcrypt.hash(password, 12);

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

        const nuevoCliente = new cliente({
            nombre: req.body.nombreCliente,
            email: email,
            telefono: req.body.telefonoCliente,
            ubicacion: {
                centro: [req.body.latitudCliente, req.body.longitudCliente],
            },
            password: hashedPassword
        })
        nuevoCliente.save();
        res.redirect('index');

    } catch (error) {
        console.error(error);
    }
    next();
}

exports.loginCliente = async (req, res) => {
    //const {email, password} = req.body;
    const email = req.body.emailLogin;
    const password = req.body.pwdLogin;
    const usuario = await cliente.findOne({ email });

    const passwordCorrect = usuario && usuario.password ? await bcrypt.compare(password, usuario.password) : false;
    const token = usuario && usuario._id ? jwt.sign({ id: usuario._id }, secret, { expiresIn: '1hr' }) : false;

    res.cookie('tokenLeandro', token, {
        httpOnly: true.valueOf,
        maxAge: 3600,
    })

    try {
        if (usuario && passwordCorrect) {
            return res.status(200).json({ message: `Bienvenido ${token}` });
        } else {
            return res.status(401).json({ message: 'El correo o la contraseña son incorrectos' });
        }
    } catch (error) {
        console.error(error);
    }

    // try {
    //     if (!usuario) {
    //         return res.status(400).json({message: 'El correo no existe'});
    //     } var nodemailer = require('nodemailer');

    //     const passwordCorrecta = await bcrypt.compare(password, usuario.password);
    //     if (!passwordCorrecta) {
    //         return res.status(400).json({message: 'Contraseña incorrecta'});
    //     }

    // } catch (error) {

    // }


}

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