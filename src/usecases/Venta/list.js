const salesData = require("../../data/ventas.data");

exports.listAllSales = async () => {
  return await salesData.findAll();
};
