const clientData = require('../../data/clientesData');
const salesData = require('../../data/ventasData');

exports.getClient = async (id) => {
    const client = await clientData.findById(id);
    if (!client) {
        return { error: 'No existe el cliente' };
    }
    const sales = await salesData.findByClient(client.email);

    return { client, sales };
}