/**
 * Script para obtener la ubicación del cliente
 */
function obtenerUbicacion() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(actualizarCamposUbicacion);
  } else {
    console.log("La geolocalización no es compatible con este navegador.");
  }
}

/**
 * Función para actualizar los campos de latitud y longitud
 * @param {Object} position Objeto con la posición del cliente
 */
function actualizarCamposUbicacion(position) {
  const latitud = position.coords.latitude;
  const longitud = position.coords.longitude;

  // Actualizar los valores de los campos de latitud y longitud
  document.getElementById("latitudCliente").value = latitud;
  document.getElementById("longitudCliente").value = longitud;
}

// Llamar a la función para obtener la ubicación al cargar la página
obtenerUbicacion();
