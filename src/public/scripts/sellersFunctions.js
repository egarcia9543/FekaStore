/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
function llenarDatosModal(id, nombre, documento, email) {
  idVendedor.value = id;
  nombreVendedor.value = nombre;
  documentoVendedor.value = documento;
  correoVendedor.value = email;
}

function eliminar(id) {
  const trigger = document.getElementById("eliminarButton");
  trigger.setAttribute("href", `eliminarvendedor/${id}`);
}
