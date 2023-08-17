const saleData = require("../../data/ventasData");
const productData = require("../../data/productosData");
const clientData = require("../../data/clientesData");
const sellerData = require("../../data/vendedoresData");

exports.createSaleRecord = async (saleInfo) => {
  const {productosVenta, subtotal, fechaVenta, impuesto, totalVenta, cliente, vendedor} = saleInfo;

  const products = [];
  const product = await productData.findById(productosVenta);
  products.push({
    id: productosVenta,
    precio: parseFloat(product.precio),
    nombre: product.nombre,
    imagen: product.imagen,
    cantidad: 1,
  });
  product.stock -= 1;
  if (product.stock <= 0) {
    const habilitado = false;
    product.habilitado = habilitado;
  }
  await productData.saveChanges(product);

  const seller = await sellerData.findByEmail(vendedor);
  seller.ventasDespachadas.push({
    productosVenta: products,
    totalVenta: totalVenta,
    fechaVenta: fechaVenta,
  });
  await sellerData.saveChanges(seller);

  const client = await clientData.findByEmail(cliente);
  if (!client) {
    return {error: "No se encontró el cliente"};
  }
  client.historialCompras.push(fechaVenta);
  client.totalComprado += parseFloat((subtotal * 1.19).toFixed(2));
  await clientData.saveChanges(client);

  const newSale = {
    productosVenta: products,
    subtotal: subtotal,
    fechaVenta: fechaVenta,
    impuesto: impuesto,
    totalVenta: totalVenta,
    cliente: cliente,
    vendedor: vendedor,
  };
  await saleData.create(newSale);

  return {message: "Venta registrada"};
};
