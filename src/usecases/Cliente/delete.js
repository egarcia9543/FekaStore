const clientData = require("../../data/clientes.data");
const userData = require("../../data/usuarios.data");

exports.deleteClient = async (clientId) => {
  const client = await clientData.findById(clientId);
  await userData.deleteByEmail(client.email);
  await clientData.deleteById(clientId);
};
