const saleData = require('../../data/ventasData');
const productData = require('../../data/productosData');
const clientData = require('../../data/clientesData');
const sellerData = require('../../data/vendedoresData');
const sendEmail = require('../../utils/emailService');

exports.createSaleRecord = async (saleInfo) => {
    const { listaDeProductos, nombreEnvio, telefonoEnvio, emailEnvio, subtotalVenta } = saleInfo;

    const products = [];
    const cart = JSON.parse(listaDeProductos);
    cart.forEach(product => {
        products.push({
            id: product.id,
            precio: parseFloat(product.precio),
            nombre: product.nombre,
            imagen: product.imagen,
            cantidad: product.cantidad,
        })
    });
    for (let i = 0; i < products.length; i++) {
        const product = await productData.findById(products[i].id);
        product.stock -= products[i].cantidad;
        if (product.stock <= 0) {
            const habilitado = false;
            product.habilitado = habilitado;
        }
        await productData.saveChanges(product);
    }
    const seller = await sellerData.findByEmail('portal@gmail.com');
    seller.ventasDespachadas.push({
        productosVenta: products,
        totalVenta: parseFloat((subtotalVenta * 1.19).toFixed(2)),
        fechaVenta: new Date(),
    })
    await sellerData.saveChanges(seller);

    const client = await clientData.findByEmail(emailEnvio);
    client.historialCompras.push(new Date());
    client.totalComprado += parseFloat((subtotalVenta * 1.19).toFixed(2));
    await clientData.saveChanges(client);

    const newSale = {
        productosVenta: products,
        subtotal: subtotalVenta,
        fechaVenta: new Date(),
        impuesto: 19,
        totalVenta: parseFloat((subtotalVenta * 1.19).toFixed(2)),
        cliente: emailEnvio,
        vendedor: 'portal@gmail.com'
    }
    await saleData.create(newSale);
    await sendEmail.sendEmail(
        emailEnvio,
        'Compra realizada',
        `Gracias por comprar en nuestra tienda
        Estos son los productos que compraste:
            ${cart.map(product => `${product.nombre} - ${product.cantidad} unidades`)}
        El total de tu compra es: ${parseFloat((subtotalVenta * 1.19).toFixed(2))}`
    )

    return { message: 'Venta registrada' };
}


