const clientData = require("../../data/clientes.data");

exports.listAllClients = async () => {
  return await clientData.findAll();
};
