const saleData = require('../../data/ventasData');
const productData = require('../../data/productosData');
const clientData = require('../../data/clientesData');
const sellerData = require('../../data/vendedoresData');

exports.createSaleRecord = async (saleInfo) => {
    const { emailEnvio, listaDeProductos,  subtotalVenta, productosVenta, cliente } = saleInfo;
    const fechaVenta = new Date();
    const dia = fechaVenta.getDate(); 
    const year = fechaVenta.getFullYear(); 
    const mes = fechaVenta.getMonth() + 1;
    const fecha = `${year}-${mes}-${dia}`;
    const products = [];
    
    if (listaDeProductos) {
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
        const newSale = {
            productosVenta: products,
            subtotal: subtotalVenta,
            fechaVenta: fecha,
            impuesto: 19,
            totalVenta: (subtotalVenta * 1.19).toFixed(2),
            cliente: emailEnvio,
            vendedor: 'portal@gmail.com'
        }
        await saleData.create(newSale);

        const seller = await sellerData.findByEmail({ email: 'portal@gmail.com'});
        seller.ventasDespachadas.push({
            productosVenta: products,
            totalVenta: (subtotalVenta * 1.19).toFixed(2),
            fechaVenta: fecha,
        })
        await sellerData.saveChanges(seller);

        const client = await clientData.findByEmail(emailEnvio);
        if (!client) {
            return { error: 'No se encontró el cliente' }
        }
        client.historialCompras.push(fecha);
        client.totalComprado += (subtotalVenta * 1.19).toFixed(2);
        await clientData.saveChanges(client);
    } else {
        const product = await productData.findById(productosVenta);
        products.push({
            id: productosVenta,
            precio: parseFloat(product.precio),
            nombre: product.nombre,
            imagen: product.imagen,
            cantidad: 1,
        })
        product.stock -= 1;
        await productData.saveChanges(product);

        const client = await clientData.findByEmail(cliente);
        if (!client) {
            return { error: 'No se encontró el cliente' }
        }
        client.historialCompras.push(fecha);
        client.totalComprado += (product.precio * 1.19).toFixed(2);
        await clientData.saveChanges(client);

        const newSale = {
            productosVenta: products,
            subtotal: product.precio,
            fechaVenta: fecha,
            impuesto: 19,
            totalVenta: (product.precio * 1.19).toFixed(2),
            cliente: cliente,
            vendedor: seller.email,
        }
        await saleData.create(newSale);
    }
}

