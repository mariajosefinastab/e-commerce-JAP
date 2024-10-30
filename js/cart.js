document.addEventListener("DOMContentLoaded", async () => {
    //Cotizacion dolar.
    await cotizacionDolar();
    const carrito = getCarrito();
    displayCarrito(carrito);
});

// Función que arma el contenido
function displayCarrito(carrito) {
    const contenedor = document.getElementById("cart-product");
    let total = 0;
    let precioFinal = 0 
    contenedor.innerHTML = ""; // Limpiar el contenedor

    if (carrito.items.length === 0) {
        contenedor.innerHTML = "<tr><td colspan='4' class='text-center'>El carrito está vacío. No hay productos cargados.</td></tr>";
    } else {
        carrito.items.forEach( item => {
            if(item.moneda == "USD"){
                total = (item.precio * item.cantidad).toFixed(2);
                console.log("total",item.precio, item.cantidad, total)
                let enPesos = APESO * total;
                console.log("enPeso",APESO, enPesos);
                precioFinal += parseInt(enPesos);
            }else{
                total = (item.precio * item.cantidad).toFixed(2);
                precioFinal += parseInt(total);
            }
            console.log("imprimo:", item.id, precioFinal)
            const row = `
            <tr class="mb-3 text-center fila">
                <td>
                    <div class="col">
                        <img src="${item.imagen || 'img/car1.jpg'}" class="rounded float-start cart-image" alt="${item.nombre}">
                    </div>
                    <h5 class="fs-4">${item.nombre}</h5>
                    <p class="text-muted">${item.descripcion || "Descripción no disponible"}</p>
                </td>
                <td>${item.moneda}$${item.precio}</td>
         
                <td>
                    <div class="d-flex">
                    <button class="btn btn-sm btn-outline-secondary" onclick=actualizarCarrito(${item.id},"resta")>-</button>
                    <p class="align-middle mx-2">${item.cantidad}</p>
                    <button class="btn btn-sm btn-outline-secondary" onclick=actualizarCarrito(${item.id},"suma")>+</button>
                    </div>    
                </td>
                <td>${item.moneda}$${total}</td>
            </tr>
            `;
            contenedor.innerHTML += row; // Agregar cada fila al contenedor
        });
        
        // Total
        const row = `
        <tr class="mb-3 text-center fila">
            <td colspan="4">
            <div class="text-end row container">
                <p><strong>Total:</strong></p>
                <p class="col text-end fs-3">$${precioFinal}</p>
            </div>
            </td>
        </tr>
        `
        contenedor.innerHTML += row;
    }
}


//Sumar cantidad de productos
function actualizarCarrito(idProducto,sumaresta){
    console.log("actualizarCarrito()",idProducto, sumaresta)
    let carrito = getCarrito();
    carrito.items.forEach(elemento => {
    if (elemento.id == idProducto){
        if (sumaresta == "suma") {
            addCarrito(elemento);
            displayCarrito(getCarrito());
        }
        if (sumaresta == "resta") {
            removeCarrito(elemento);
            displayCarrito(getCarrito());
        }
    }
  });      
}