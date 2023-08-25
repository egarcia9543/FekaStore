/* eslint-disable no-undef */
/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */

// Variables globales
let shoppingCart = JSON.parse(localStorage.getItem("carrito")) || [];
const cartContent = document.getElementById("cartBody");
const totalPriceContainer = document.getElementById("totalPrice");

// Funciones
// Esta función se encarga de calcular el total de la compra y mostrarlo en el carrito
function totalCarrito() {
  const total = shoppingCart.reduce((acc, el) => acc + parseFloat(el.precio) * el.cantidad, 0);

  if (total === 0) {
    totalPriceContainer.innerHTML = "";
  } else {
    totalPriceContainer.innerHTML = `
        <div class="d-flex justify-content-evenly align-items-center mt-3 mb-3">
            <p class="text-center fw-bold text-success m-0">Total: $${total.toFixed(2)}</p>
            <a href="/compra" class="btn btn-success">Finalizar compra</a>
        </div>`;
  }
}

// Esta función se encarga de agregar un producto al carrito
function agregarAlCarrito(id, precio, nombre, imagen, stock, cantidad) {
  const tallasRadios = document.getElementsByName("talla");
  let tallaSeleccionada = null;

  tallasRadios.forEach((radio) => {
    if (radio.checked) {
      tallaSeleccionada = radio.value;
    }
  });

  if (!tallaSeleccionada) {
    Swal.fire({
      icon: "warning",
      title: "Selecciona una talla",
      text: "Por favor, selecciona una talla antes de agregar al carrito.",
      confirmButtonText: "Aceptar",
    });
    return;
  }
  Swal.fire({
    icon: "success",
    title: "Producto agregado al carrito",
    text: "El producto " + nombre + " ha sido agregado al carrito.",
    confirmButtonText: "Aceptar",
  });
  const producto = {
    id: id,
    precio: precio,
    nombre: nombre,
    imagen: imagen,
    stock: stock,
    cantidad: cantidad,
    talla: tallaSeleccionada,
  };
  const productInCart = shoppingCart.find((existing) => existing.id === producto.id);
  if (productInCart) {
    shoppingCart.map((existing) => {
      if (existing.id === producto.id) {
        if (existing.cantidad >= stock) {
          alert("No hay más stock disponible");
        } else {
          existing.cantidad++;
        }
      }
    });
  } else {
    shoppingCart.push(producto);
  }

  saveLocalStorage();
}

// Esta función se encarga de restar la cantidad de un producto en el carrito
function restar(id) {
  shoppingCart.find((existing) => {
    if (existing.id === id) {
      existing.cantidad--;
      if (existing.cantidad === 0) {
        eliminarProducto(id);
      }
    }
  });
  saveLocalStorage();
  actualizarCarritoDOM();
}

// Esta función se encarga de sumar la cantidad de un producto en el carrito
function sumar(id, stock) {
  shoppingCart.find((existing) => {
    if (existing.id === id) {
      if (existing.cantidad < stock) {
        existing.cantidad++;
      } else {
        Swal.fire({
          icon: "warning",
          title: "Sin stock",
          text: "Este producto no tiene más stock disponible.",
          confirmButtonText: "Aceptar",
        });
        return;
      }
    }
  });
  saveLocalStorage();
  actualizarCarritoDOM();
}

// Esta función se encarga de guardar el carrito en el localStorage
function saveLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(shoppingCart));
}

// Esta función se encarga de eliminar un producto del carrito
function eliminarProducto(id) {
  shoppingCart = shoppingCart.filter((producto) => producto.id != id);
  const productDetail = document.getElementById(id);
  productDetail.remove();

  totalCarrito();
  saveLocalStorage();
}

// Esta función se encarga de actualizar el carrito en el DOM
function actualizarCarritoDOM() {
  cartContent.innerHTML = "";

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
                  <div class="d-flex">
                      <p class="m-0 me-2 fw-bold">${producto.nombre}</p>
                      <p class="m-0 fw-bold text-success">$${(producto.precio)}</p>
                  </div>
                    <p class="m-0">Talla: ${producto.talla}</p>
                    <p class="m-0 fw-bold">Total: $${(producto.precio * producto.cantidad).toFixed(2)}</p>
                </div>    
                <div class="d-flex flex-column justify-content-center align-items-center">
                    <div class="d-flex justify-content-between align-items-center ms-4 me-4">
                        <button class="btn restar" onclick="restar('${producto.id}')">-</button>
                            <input class="m-1 form-control form-control-xs text-center" readonly value="${producto.cantidad}">
                        <button class="btn sumar" onclick="sumar('${producto.id}', '${producto.stock}')">+</button>
                    </div>
                </div>
            </div>
            <div>
                <button class="btn btn-danger" onclick="eliminarProducto('${producto.id}')"><i class="bi bi-trash"></i></button>
            </div>
        </div>
    `;
    cartContent.appendChild(productDetail);
  });
  totalCarrito();
}

// Esta función se encarga de mostrar los detalles de un producto en el modal
function verDetalles(id, precio, nombre, imagen, descripcion, stock, referencia) {
  const details = document.getElementById("details");
  details.innerHTML = `
    <div class="d-flex justify-content-center w-50">
        <img src="${imagen}${nombre}" class="rounded img-fluid object-fit-cover" id="img-product-details">
    </div>
    <div class="d-flex flex-column justify-content-center align-items-center w-50 m-3">
        <div>
          <p class="fw-bold text-center">${nombre}</p>
          <p class="text-center">Referencia: ${referencia}</p>
        </div>   
        <p class="text-center">${descripcion}</p>
        <p class="text-center fw-bold text-success">$${precio}</p>
        <div class="btn-group btn-group-toggle mt-3" data-toggle="buttons">
            <label class="btn btn-outline-secondary">
            <input type="radio" name="talla" autocomplete="off" value="S"> S
            </label>
            <label class="btn btn-outline-secondary">
            <input type="radio" name="talla" autocomplete="off" value="M"> M
            </label>
            <label class="btn btn-outline-secondary">
            <input type="radio" name="talla" autocomplete="off" value="L"> L
            </label>
            <label class="btn btn-outline-secondary">
            <input type="radio" name="talla" autocomplete="off" value="XL"> XL
            </label>
        </div>
    </div>
    `;

  const footer = document.getElementById("modalFooter");
  footer.innerHTML = `
    <button type="button" class="btn btn-primary" onclick="agregarAlCarrito('${id}', '${precio}', '${nombre}', '${imagen}', '${stock}', 1)">Agregar al Carrito</button>
    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
    `;
}
