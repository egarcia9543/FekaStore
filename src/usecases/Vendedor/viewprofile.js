const sellerData = require('../../data/vendedoresData');

exports.getSeller = async (id) => {
    return await sellerData.findById(id);
}