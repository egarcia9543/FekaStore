const vendedores = require("../models/vendedores");

exports.renderListGraphs = async (req, res) => {
  res.render("admin/listaGraficas");
};

exports.salesQuantity = async (req, res)=> {
  const listaVendedores = await vendedores.find({}, {nombreCompleto: 1, ventasDespachadas: 1, _id: 0});
  res.render("admin/graficaCantidad", {
    "vendedores": listaVendedores,
  });
};
