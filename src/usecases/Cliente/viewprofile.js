const clientData = require('../../data/clientesData');

exports.getClient = async (id) => {
    return await clientData.findById(id);
}