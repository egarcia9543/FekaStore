/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
function llenarDatosModal(id, nombre, email, telefono) {
  idCliente.value = id;
  nombreCliente.value = nombre;
  emailCliente.value = email;
  telefonoCliente.value = telefono;
}

function eliminar(id) {
  const trigger = document.getElementById("eliminarButton");
  trigger.setAttribute("href", `eliminarcliente/${id}`);
}
