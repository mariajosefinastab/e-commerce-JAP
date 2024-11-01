document.getElementById("user-email").addEventListener("click", function(event) {
    //event.preventDefault(); // Evita el comportamiento por defecto del enlace
    var dropdown = document.getElementById("dropdown-menu");
    dropdown.classList.toggle("show");

    document.getElementById("cerrar-sesion").addEventListener("click", (event)=>{
        let email = localStorage.getItem("email");
        email = ""
        document.getElementById("user-email").innerHTML = ""
        window.location = "login.html"
        console.log(email);

    });

});

// Cierra el menú si se hace clic fuera del mismo
window.onclick = function(event) {
    if (!event.target.matches('#user-email')) {
        var dropdowns = document.getElementsByClassName("dropdown-menu");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
            console.log("imprimo:", item.id, precioFinal)
            const row = `
            <tr class="mb-3 text-center fila">
                <td>
                    <div class="col">
                        <img src="${item.imagen || 'img/car1.jpg'}" class="rounded float-start cart-image" alt="${item.nombre}">
                    </div>
                    <h5 class="fs-4 item-nombre" >${item.nombre}</h5>
                    <p class="text-muted item-descripcion">${item.descripcion || "Descripción no disponible"}</p>
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
        };
        
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
