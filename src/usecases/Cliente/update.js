const clientData = require('../../data/clientesData');
const userData = require('../../data/usuariosData');

exports.updateClient = async (clientInfo) => {
    const { idCliente, nombreCliente, emailCliente, telefonoCliente } = clientInfo;
    const updatedClient = {
        nombre: nombreCliente,
        email: emailCliente,
        telefono: telefonoCliente
    }
    await clientData.updateById(idCliente, updatedClient);
    await userData.findByEmailAndUpdate(emailCliente, { email: updatedClient.email})

    return { message: 'Cliente actualizado'}
}