let shoppingCart = JSON.parse(localStorage.getItem('carrito')) || [];
let cartContent = document.getElementById('offcanvasBody');
let totalPriceContainer = document.getElementById('totalPrice');

function totalCarrito() {
    const total = shoppingCart.reduce((acc, el) => acc + parseFloat(el.precio) * el.cantidad, 0);
    totalPriceContainer.innerHTML = `<p class="text-center fw-bold text-success">Total: $${total.toFixed(2)}</p>`;
}

function agregarAlCarrito(id, precio, nombre, imagen, cantidad) {
    //Creamos el objeto con los parametros que recibe la funcion
    let producto = {
        id: id,
        precio: precio,
        nombre: nombre,
        imagen: imagen,
        cantidad: cantidad
    }
    //Se añade al carrito el objeto
    const productInCart = shoppingCart.some(existing => existing.id === producto.id);
    if (productInCart) {
        shoppingCart.map(existing => {
            if (existing.id === producto.id) {
                existing.cantidad++;
            }
        });
    } else {
        shoppingCart.push(producto);
    }
    console.log(shoppingCart);
    //Sumar el total de los productos
    totalCarrito();

    saveLocalStorage();
    actualizarCarritoDOM();
    }

function saveLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(shoppingCart));
}

function eliminarProducto(id) {
    //Eliminar del carrito
    shoppingCart = shoppingCart.filter(producto => producto.id != id);
    //Eliminar del DOM
    let productDetail = document.getElementById(id);
    productDetail.remove();
    //Sumar el total de los productos
    totalCarrito();
    saveLocalStorage();
}

function actualizarCarritoDOM() {
    // Limpiar el contenido del carrito antes de actualizarlo
    cartContent.innerHTML = '';

    // Recorrer los productos en el carrito y crear los elementos en el DOM
    shoppingCart.forEach(producto => {
        let productDetail = document.createElement('div');
        productDetail.setAttribute('id', producto.id);
        productDetail.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'mb-3');
        productDetail.innerHTML = `
            <div class="d-flex align-items-center">
                <img src="${producto.imagen}" class="imagenCarrito rounded">
                <div class="d-flex flex-column justify-content-center align-items-center">
                    <p class="m-0 ms-3 fw-bold">${producto.nombre}</p>
                    <p class="m-0 ms-3 fw-bold">Cantidad: ${producto.cantidad}</p>
                </div>
            </div>
            <p class="m-0 fw-bold text-success">$${producto.precio * producto.cantidad}</p>
            <button class="btn btn-danger" onclick="eliminarProducto('${producto.id}')"><i class="bi bi-trash"></i></button>
        `;
        cartContent.appendChild(productDetail);
    });
    totalCarrito();
}

actualizarCarritoDOM();