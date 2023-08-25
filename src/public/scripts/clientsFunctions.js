function llenarDatosModal(id, nombre, email, telefono) {
    idCliente.value = id;
    nombreCliente.value = nombre;
    emailCliente.value = email;
    telefonoCliente.value = telefono;
}

function eliminar(id) {
    let trigger = document.getElementById('eliminarButton');
    trigger.setAttribute('href', `eliminarcliente/${id}`)
}