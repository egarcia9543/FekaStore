const clientData = require('../../data/clientesData');
const userData = require('../../data/usuariosData');
const bcrypt = require('bcrypt');

exports.updateClient = async (clientInfo) => {
    const { idCliente, nombreCliente, emailCliente, telefonoCliente, newPassword } = clientInfo;

    const existingClient = await clientData.findById(idCliente);
    if (!existingClient) {
        return { error: 'Cliente no encontrado' };
    }

    const updatedClient = {
        nombre: nombreCliente,
        email: emailCliente,
        telefono: telefonoCliente
    }

    if (emailCliente !== existingClient.email) {
        const userRegistered = await userData.findByEmail(emailCliente);
        if (userRegistered) {
            return { error: 'El correo ya está registrado en la colección de usuarios' };
        }

        await userData.findByEmailAndUpdate(existingClient.email, { email: emailCliente });
    }

    if (newPassword) {
        const passwordEncrypted = await bcrypt.hash(newPassword, 12);
        updatedClient.password = passwordEncrypted;
    }

    await clientData.updateById(idCliente, updatedClient);
    await userData.findByEmailAndUpdate(existingClient.email, {
    email: emailCliente,
    password: updatedClient.password
});

    return { message: 'Cliente actualizado' }
}
