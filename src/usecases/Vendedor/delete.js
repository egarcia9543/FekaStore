const sellerData = require('../../data/vendedoresData');
const userData = require('../../data/usuariosData');

exports.deleteSeller = async (sellerId) => {
    const seller = await sellerData.findById(sellerId);
    await userData.deleteByEmail(seller.correo);
    await sellerData.deleteById(sellerId);
}