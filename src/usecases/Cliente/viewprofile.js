const clientData = require("../../data/clientes.data");
const salesData = require("../../data/ventas.data");

exports.getClient = async (id) => {
  const client = await clientData.findById(id);
  if (!client) {
    return {error: "No existe el cliente"};
  }
  const sales = await salesData.findByClient(client.email);

  return {client, sales};
};
