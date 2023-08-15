const productData = require('../../data/productosData');

exports.changeState = async(productId) => {
    const producto = await productData.findById(productId);
    if (!producto) {
        return { error: 'El producto no existe' };
    }

    producto.habilitado = !producto.habilitado;
    return await productData.saveChanges(producto);
}