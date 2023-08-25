function llenarDatosModal(id, nombre, documento, email) {
    idVendedor.value = id;
    nombreVendedor.value = nombre;
    documentoVendedor.value = documento;
    correoVendedor.value = email;
}

function eliminar(id) {
    let trigger = document.getElementById('eliminarButton');
    trigger.setAttribute('href', `eliminarvendedor/${id}`)
}