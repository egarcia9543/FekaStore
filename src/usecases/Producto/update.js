const productData = require("../../data/productosData");

exports.updateProduct = async (productInfo) => {
  const {id, referencia, nombre, descripcion, stock, precio} = productInfo;
  const habilitado = stock > 0 ? true : false;


  const existingProduct = await productData.findById(id);
  if (!existingProduct) {
    return {error: "No se encontró el producto"};
  }

  if (referencia !== existingProduct.referencia) {
    const referenciaRegistrada = await productData.findByReferencia(referencia);
    if (referenciaRegistrada) {
      return {error: "Ya existe un producto con la misma referencia"};
    }
  }

  const updatedInfo = {
    referencia: referencia,
    nombre: nombre,
    descripcion: descripcion,
    stock: stock,
    precio: precio,
    habilitado: habilitado,
  };

  await productData.updateById(id, updatedInfo);
  return {success: true};
};
