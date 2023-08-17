const clientData = require("../../data/clientesData");
const userData = require("../../data/usuariosData");

exports.deleteClient = async (clientId) => {
  const client = await clientData.findById(clientId);
  await userData.deleteByEmail(client.email);
  await clientData.deleteById(clientId);
};
