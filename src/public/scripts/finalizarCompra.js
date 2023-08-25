/* eslint-disable require-jsdoc */
const contenedorProductos = document.getElementById("contenidoCheckout");
const totalCheckout = document.getElementById("totalAPagar");
const shoppingCart = JSON.parse(localStorage.getItem("carrito")) || [];
const body = document.getElementById("body");

// eslint-disable-next-line no-unused-vars
function renderProductos() {
  if (shoppingCart.length === 0) {
    body.innerHTML = `
        <div class="container mt-5">
          <div class="card">
            <div class="card-header">
              <h4 class="text-center">No hay productos en el carrito</h4>
            </div>
            <div class="card-body d-flex flex-column justify-content-center align-items-center">
              <img src="/imgs/empty.gif" class="img-fluid mt-3 mb-3" alt="Carrito vacío">
              <a href="/catalogo" class="btn btn-success mt-5">Volver al catálogo</a>
            </div>
          </div>
        </div>
        `;

    return;
  }
  shoppingCart.forEach((producto) => {
    const productDetail = document.createElement("div");
    productDetail.setAttribute("id", producto.id);
    productDetail.classList.add("d-flex", "justify-content-center", "align-items-center", "mb-3");
    productDetail.innerHTML = `
                <div class="d-flex align-items-center">
                    <div>
                        <img src="${producto.imagen}${producto.nombre}" class="imagenCarrito rounded">
                    </div>
                    <div>
                        <div class="d-flex justify-content-center flex-column align-items-center">
                            <p class="m-0 fw-bold" id="${producto.id}">${producto.nombre}</p>
                            <p class="m-0">Talla: ${(producto.talla)}</p>
                            <p class="m-0 fw-bold text-success">$${(producto.precio * producto.cantidad).toFixed(2)}</p>
                        </div>    
                        <div class="d-flex flex-column justify-content-center align-items-center">
                            <div class="d-flex justify-content-between align-items-center ms-4 me-4">
                                <input class="m-1 form-control form-control-xs text-center" readonly value="${producto.cantidad}"></input>
                            </div>
                        </div>
                    </div>
                </div>
            `;
    contenedorProductos.appendChild(productDetail);
  });
  precioTotal();
}


const subtotalContenedor = document.getElementById("datosCompra");

function precioTotal() {
  let total = 0;
  shoppingCart.forEach((producto) => {
    total += producto.precio * producto.cantidad;
  });
  totalCheckout.innerHTML = `<input class="m-1 form-control form-control-xs text-center" name="subtotal" value="$${total.toFixed(2)}" readonly>`;
  const subtotal = document.createElement("input");
  subtotal.setAttribute("name", "subtotalVenta");
  subtotal.setAttribute("value", total.toFixed(2));
  subtotal.setAttribute("hidden", true);
  subtotalContenedor.appendChild(subtotal);
}

