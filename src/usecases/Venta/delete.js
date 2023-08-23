const salesData = require("../../data/ventas.data");
const productData = require("../../data/productos.data");
const sellerData = require("../../data/vendedores.data");
const clientData = require("../../data/clientes.data");

exports.deleteSale = async (saleId) => {
  const saleDetails = await salesData.findById(saleId);
  if (!saleDetails) {
    return {error: "La venta no existe"};
  }
  const products = saleDetails.productosVenta;
  for (let i = 0; i < products.length; i++) {
    const product = await productData.findById(products[i].id);
    product.stock += 1;
    if (product.stock > 0) {
      product.habilitado = true;
    }
    await productData.saveChanges(product);
  }
  const seller = await sellerData.findByEmail(saleDetails.vendedor);
  const index = seller.ventasDespachadas.findIndex((sale) => sale.fechaVenta === saleDetails.fechaVenta);
  seller.ventasDespachadas.splice(index, 1);
  await sellerData.saveChanges(seller);

  const client = await clientData.findByEmail(saleDetails.cliente);
  const index2 = client.historialCompras.findIndex((sale) => sale === saleDetails.fechaVenta);
  client.historialCompras.splice(index2, 1);
  client.totalComprado -= parseFloat(saleDetails.totalVenta);
  await clientData.saveChanges(client);

  await salesData.deleteById(saleId);
  return {message: "Venta eliminada"};
};
