const sellerData = require('../../data/vendedoresData');
const userData = require('../../data/usuariosData');

exports.updateSeller = async (sellerInfo) => {
    const { idVendedor, nombreVendedor, documentoVendedor, correoVendedor } = sellerInfo;
    
    const updatedInfo = {
        nombreCompleto: nombreVendedor,
        documento: documentoVendedor,
        correo: correoVendedor
    }
    await sellerData.updateById(idVendedor, updatedInfo);
    await userData.findByEmailAndUpdate(correoVendedor, {email: updatedInfo.correo})
    
    return { message: 'Vendedor actualizado' };
}