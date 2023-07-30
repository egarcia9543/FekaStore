const cliente = require('../models/clientes');
const usuarios = require('../models/usuarios');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

        if (password.length < 8) {
            return res.json({
                message: 'Ingresa una contraseña de 8 caracteres'
            })
        }

        const clienteRegistrado = new cliente({
            nombre: req.body.nombreCliente,
            email: email,
            telefono: req.body.telefonoCliente,
            ubicacion: {
                centro: [req.body.latitudCliente, req.body.longitudCliente],
            },
            password: passwordEncriptada,
        })
        await clienteRegistrado.save();
        const usuarioTipoCliente = new usuarios({
            email: clienteRegistrado.email,
            password: clienteRegistrado.password,
            rol: 'cliente'
        })
        await usuarioTipoCliente.save();
        const token = jwt.sign({ id: clienteRegistrado._id }, secret, { expiresIn: expires, });
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
            text: `¡Hola, ${clienteRegistrado.nombre}! Gracias por registrarte en nuestra tienda`
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
        const clienteRegistrado = await cliente.findOne({email: req.body.emailLogin});
        const usuarioRegistrado = await usuarios.findOne({ email: req.body.emailLogin });
        if (!usuarioRegistrado) {
            // return res.json({ error: 'Este usuario no existe' });
            return res.json({error: 'Este usuario no existe'});
        }
        const passwordCorrecta = await bcrypt.compare(password, usuarioRegistrado.password);
        if (passwordCorrecta) {
            const token = jwt.sign({ id: clienteRegistrado._id }, secret, { expiresIn: expires });
            if (usuarioRegistrado.rol === 'cliente') {
                return res.cookie( 'token',  token ).redirect('perfil');
            } else {
                return res.cookie('token', token).redirect('indexadmin');
            }
        } else {
            return res.json({ error: 'Contraseña incorrecta' });
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
            if (err) {perfil
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
        console.log(req.id)
        const clienteLogeado = await cliente.findById({'_id': req.id})
        console.log(clienteLogeado)
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

exports.sendEmail = async (req, res) => {
    const nuevaContrasena = Math.random().toString(36).slice(-8);
    const passwordEncriptada = await bcrypt.hash(nuevaContrasena, 12);
    const clienteRecuperando =  await usuarios.findOneAndUpdate({"email": req.body.emailAddress}, {"password": passwordEncriptada});
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
    }
}