const vendedores = require("../models/vendedores");
const getseller = require("../usecases/Vendedor/viewprofile");


exports.renderListGraphs = async (req, res) => {
  const seller = await getseller.getSeller(req.id);
  res.render("admin/listaGraficas", {
    "vendedor": seller,
  });
};

exports.salesQuantity = async (req, res)=> {
  const seller = await getseller.getSeller(req.id);
  const listaVendedores = await vendedores.find({}, {nombreCompleto: 1, ventasDespachadas: 1, _id: 0});
  res.render("admin/graficaCantidad", {
    "vendedores": listaVendedores,
    "vendedor": seller,
  });
};
