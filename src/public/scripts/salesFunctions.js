function eliminar(id) {
    let trigger = document.getElementById('eliminarButton');
    trigger.setAttribute('href', `eliminarventa/${id}`)
}

function llenarData(id, cliente, vendedor) {
    idventa.value = id;
    clienteventa.value = cliente;
    vendedorventa.value = vendedor;
}