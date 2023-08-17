const productData = require("../../data/productosData");

exports.createNewProduct = async (reqData) => {
  const {referenciaProducto, nombreProducto, descripcionProducto, precioProducto, stockProducto, imagenProducto} = reqData;

  const referenciaRegistrada = await productData.findByReferencia(referenciaProducto);
  if (referenciaRegistrada) {
    return {error: "Esta referencia ya está registrada"};
  }

  const precioCorrecto = parseFloat(precioProducto);
  if (isNaN(precioCorrecto)) {
    return {error: "El precio debe ser un número"};
  }

  const stockCorrecto = parseInt(stockProducto);
  if (isNaN(stockCorrecto)) {
    return {error: "El stock debe ser un número"};
  }

  const habilitado = stockProducto > 0 ? true : false;
  const nuevoProducto = {
    referencia: referenciaProducto,
    nombre: nombreProducto,
    descripcion: descripcionProducto,
    precio: precioProducto,
    stock: stockProducto,
    imagen: imagenProducto,
    habilitado: habilitado,
  };

  await productData.create(nuevoProducto);
  return {success: true};
};


