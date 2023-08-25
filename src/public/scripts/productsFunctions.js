function llenarData(id, referencia, nombre, descripcion, stock, precio) {
    idProducto.value = id;
    referenciaProducto.value = referencia;
    nombreProducto.value = nombre;
    descripcionProducto.value = descripcion;
    stockProducto.value = stock;
    precioProducto.value = precio;
}

function eliminar(id) {
    let trigger = document.getElementById('eliminarButton');
    trigger.setAttribute('href', `eliminarproducto/${id}`)
}