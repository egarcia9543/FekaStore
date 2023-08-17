const createClientUsecae = require('../usecases/Cliente/create');
const listClientUsecase = require('../usecases/Cliente/list');
const updateClientUsecase = require('../usecases/Cliente/update');
const deleteClientUsecase = require('../usecases/Cliente/delete');
const viewProfileUsecase = require('../usecases/Cliente/viewprofile');

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
    res.render('formularioRecuperacion')
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

exports.listClients = async (req, res) => {
    try {
        const resultado = await listClientUsecase.listAllClients();
        if (!resultado){
            return res.status(404).json({
                error: 'No hay clientes registrados'
            })
        }
        return res.render('admin/listOfClients', {
            'clientes': resultado
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Error al listar los clientes'
        });
    }
}

exports.viewProfile = async (req, res) => {
    try {
        const resultado = await viewProfileUsecase.getClient(req.id);
        if (!resultado){
            return res.status(404).json({
                error: 'No se encontró este perfil'
            })
        }
        return res.render('perfil', {
            'perfilCliente': resultado
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Error al listar el perfil'
        });
    }
}

exports.editProfile = async (req, res) => {
    try {
        const resultado = await updateClientUsecase.updateClient(req.body);
        if (!resultado){
            return res.status(400).json({
                error: 'No se pudo actualizar el cliente'
            });
        }
        return res.redirect('/store/v1/perfil');
    } catch (error) {
        return res.status(500).json({
            error: 'Error al actualizar el cliente'
        });
    }
}

exports.updateClientInfo = async (req, res) => {
    try {
        const resultado = await updateClientUsecase.updateClient(req.body);
        if (!resultado){
            return res.status(400).json({
                error: 'No se pudo actualizar el cliente'
            });
        }
        return res.redirect('/store/v1/datatableclientes');
    } catch (error) {
        return res.status(500).json({
            error: 'Error al actualizar el cliente'
        });
    }
}

exports.deleteClient = async (req, res) => {
    try {
        await deleteClientUsecase.deleteClient(req.params.id);
        return res.redirect('/store/v1/datatableclientes');
    } catch (error) {
        return res.status(500).json({
            error: 'Error al eliminar el cliente'
        });
    }
}