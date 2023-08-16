const createClientUsecae = require('../usecases/Cliente/create');

const jwt = require('jsonwebtoken');

exports.renderLandingPage = (req, res) => {
    res.render('index')
}

exports.renderSignupForm = (req, res) => {
    res.render('signup')
}

exports.renderLoginForm = async (req, res) => {
    res.render('signin');
}

exports.renderRecoverForm = (req, res) => {
    res.render('formulario')
}

exports.registerNewClient = async (req, res) => {
    try {
        const { token, error} = await createClientUsecae.createNewClient(req.body);
        if(error) {
            return res.status(400).json({
                error: error.message
            })
        }
        return res.cookie('token', token).redirect('perfil');
    } catch (error) {
        return res.status(500).json({
            error: 'Error al registrar el cliente'
        })
    }
}