const clientData = require("../../data/clientes.data");
const salesData = require("../../data/ventas.data");
const sellerData = require("../../data/vendedores.data");

exports.getClient = async (id) => {
  const client = await clientData.findById(id);
  if (!client) {
    const seller = await sellerData.findById(id);
    if (!seller) {
      return {error: "No se encontró el cliente"};
    }
    return {seller};
  }
  const sales = await salesData.findByClient(client.email);

  return {client, sales};
};
