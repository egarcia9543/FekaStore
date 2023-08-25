/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
function eliminar(id) {
  const trigger = document.getElementById("eliminarButton");
  trigger.setAttribute("href", `eliminarventa/${id}`);
}

function llenarData(id, cliente, vendedor) {
  idventa.value = id;
  clienteventa.value = cliente;
  vendedorventa.value = vendedor;
}
