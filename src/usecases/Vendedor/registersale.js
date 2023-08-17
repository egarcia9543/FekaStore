const saleData = require('../../data/ventasData');
const productData = require('../../data/productosData');
const clientData = require('../../data/clientesData');
const sellerData = require('../../data/vendedoresData');

exports.createSaleRecord = async (saleInfo) => {
    const { productosVenta, subtotal, fechaVenta, totalVenta, cliente } = saleInfo;
}