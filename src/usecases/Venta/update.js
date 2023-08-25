const saleData = require("../../data/ventas.data");
const sellerData = require("../../data/vendedores.data");
const clientData = require("../../data/clientes.data");

exports.updateSale = async (saleInfo) => {
    const { idventa, clienteventa, vendedorventa } = saleInfo;
    const saleRegistered = await saleData.findById(idventa);
    if (!saleRegistered) {
        return { error: "Venta no encontrada" };
    }
    const existingSeller = await sellerData.findByEmail(vendedorventa);
    if (!existingSeller) {
        return { error: "Vendedor no encontrado" };
    }
    const existingClient = await clientData.findByEmail(clienteventa);
    if (!existingClient) {
        return { error: "Cliente no encontrado" };
    }
    const updatedInfo = {
        cliente: clienteventa,
        vendedor: vendedorventa,
    };
    await saleData.updateById(idventa, updatedInfo);
    return { message: "Venta actualizada" };
}