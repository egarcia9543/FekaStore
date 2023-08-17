const productData = require('../../data/productosData');

exports.changeState = async(productId) => {
    const producto = await productData.findById(productId);
    if (!producto) {
        return { error: 'El producto no existe' };
    }

    if (producto.stock > 0) {
        producto.habilitado = !producto.habilitado;
    } else {
        return { error: 'No se puede habilitar un producto sin stock' };
    }

    return await productData.saveChanges(producto);
}