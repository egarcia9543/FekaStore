const salesData = require('../../data/ventasData');

exports.listAllSales = async () => {
    return await salesData.findAll();
}