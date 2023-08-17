const clientData = require("../../data/clientesData");

exports.listAllClients = async () => {
  return await clientData.findAll();
};
