document.addEventListener("DOMContentLoaded", () => {
    const carrito = getCarrito();
    displayCarrito(carrito);
});

// Función que arma el contenido
function displayCarrito(carrito) {
    const contenedor = document.getElementById("cart-product");
    contenedor.innerHTML = ""; // Limpiar el contenedor

    let precioFinal = 0 

    if (carrito.items.length === 0) {
        contenedor.innerHTML = "<tr><td colspan='4' class='text-center'>El carrito está vacío. No hay productos cargados.</td></tr>";
    } else {
        carrito.items.forEach(item => {
            const total = (item.precio * item.cantidad).toFixed(2);
            precioFinal += parseInt(total);
            const row = `
            <tr class="mb-3 text-center fila">
                <td>
                    <div class="col">
                        <img src="${item.imagen || 'img/car1.jpg'}" class="rounded float-start" alt="${item.nombre}">
                    </div>
                    <h5 class="fs-4">${item.nombre}</h5>
                    <p class="text-muted">${item.descripcion || "Descripción no disponible"}</p>
                </td>
                <td>${item.moneda}$${item.precio}</td>
         
                <td>
                    <button class="btn btn-sm btn-outline-secondary" onclick="restarProducto(${item.id})">-</button>
                    <button class="btn btn-sm btn-outline-secondary" onclick="sumarProducto(${item.id})">+</button>
                    <p>${item.cantidad}</p>
                </td>
                <td>${item.moneda}$${total}</td>
            </tr>
            `;
            contenedor.innerHTML += row; // Agregar cada fila al contenedor
        });
        
        // Total
        const row = ` 
        <div class="text-end row container">
          <div class="col">
            <p><strong>Total:</strong></p>
            <p class="col text-end fs-3">${precioFinal}</p>
        </div>
      </div>
        `
        contenedor.innerHTML += row;
    }
}

// Funciones para manejar la cantidad de productos
function restarProducto(id) {
    let carrito = getCarrito();
    let item = carrito.items.find(item => item.id === id);
    if (item && item.cantidad > 1) {
        item.cantidad -= 1;
    } else if (item) {
        carrito.items = carrito.items.filter(item => item.id !== id); // Eliminar producto si la cantidad es 1
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    displayCarrito(carrito); // Actualizar el contenido
}

function sumarProducto(id) {
    let carrito = getCarrito();
    let item = carrito.items.find(item => item.id === id);
    if (item) {
        item.cantidad += 1;
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    armarContenido(carrito); // Actualizar el contenido
}