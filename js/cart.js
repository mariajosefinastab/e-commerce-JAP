//Costos
let subtotal = 0;
let envio = 0;
let total = 0;

document.addEventListener("DOMContentLoaded", async () => {
    //Cotizacion dolar.
    await cotizacionDolar();
    const carrito = await getCarrito();
    displayCarrito(carrito);

    //forma pago
    document.getElementById("formaPago").addEventListener("change", medioPago);

    //envio
    const radios = document.querySelectorAll('input[name="shipping"]');
    radios.forEach(radio => {radio.addEventListener('change', formaEnvio)});
    formaEnvio();
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
                <p><strong>Sub Total:</strong></p>
                <p class="col text-end fs-3">$${precioFinal}</p>
            </div>
            </td>
        </tr>
        `
        subtotal = precioFinal;
        contenedor.innerHTML += row;
    }
    //Muestro info de pago y envio.
    displayCheckout(carrito);
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

function medioPago(){

    console.log("medioPago().");
    let medio = document.getElementById("formaPago").value;
    let form = "";
    switch(medio){
        case "credito":
            form = `<div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">Nombre</span>
              <input type="text" class="form-control" placeholder="Nombre Titular" aria-label="cardName" aria-describedby="basic-addon1" required>
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">Número</span>
              <input type="text" class="form-control" placeholder="0123 0123 0123 0123" aria-label="cardNum" aria-describedby="basic-addon1" required>
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">Validez</span>
              <input type="text" class="form-control" placeholder="01/24" aria-label="cardValid" required>
              <span class="input-group-text">CVV</span>
              <input type="text" class="form-control" placeholder="XXX" aria-label="Server" required>
            </div`;
        break;
        case "bancaria":
            form = `<ul class="list-group">
              <li class="list-group-item">Banco Mentiritas SRL:</li>
              <li class="list-group-item">Cuenta $: 5894133136889455625</li>
              <li class="list-group-item">Enviar comprobante por whatsapp</li>
            </ul>`;
        break;
    }

    document.getElementById("medioPago").innerHTML = form;
    displayCheckout(carrito);
}

function formaEnvio(){
    console.log("formaEnvio():");
    let selectedShipping = document.querySelector('input[name="shipping"]:checked').value;
    switch(selectedShipping){
        case "express":
            envio = parseFloat((subtotal*0.07).toFixed(2));
        break;
        case "premium":
            envio = parseFloat((subtotal*0.15).toFixed(2));
        break;
        case "standard":
            envio = parseFloat((subtotal*0.05).toFixed(2));
        break;
    }
    updateCostos();
}

function updateCostos(){
    console.log("updateCostos():");
    let costoSub = document.getElementById("subtotal");
    let costoEnvio = document.getElementById("envio");
    let costoTotal = document.getElementById("total");

    const total = subtotal+envio;

    costoSub.innerHTML = `Subtotal: $ ${subtotal}`;
    costoEnvio.innerHTML = `Envío: $ ${envio}`;
    costoTotal.innerHTML = `Total: $ ${total}`;
}

function displayCheckout(carrito){
    let contenedor = document.getElementById("checkoutContainer");
    console.log("check:", carrito)
    if(carrito.items.length === 0) {
        contenedor.style.display ="none";
    }else{
        contenedor.style.display =""
    }
}
// Funcion boton comprar 
document.getElementById("comprarBtn").addEventListener("click", () => {  
    // Obtener la forma de pago seleccionada
    const select = document.getElementById('formaPago');
    const valorSeleccionado = select.value;

    // Obtener todos los inputs con la clase 'form-control'
    const inputs = document.querySelectorAll('input.form-control');
    const inputsArray = Array.from(inputs);
    
    let completados = true;  // Bandera para verificar si todos los campos están completos

    // Iteramos sobre cada input para verificar si está vacío
    inputsArray.forEach(input => {
        if (input.value.trim() === '') {  // Si el campo está vacío
            completados = false;  // Cambiamos la bandera a falso si hay un campo vacío
        }
    });
    let exito= `
    <div class="alert alert-success" role="alert">Haz Realizado tu compra!! Serás redirigido en 5 segundos.</div>`
    // Verificar si se seleccionó una forma de pago válida
    if (valorSeleccionado === "credito" || valorSeleccionado === "bancaria") {
        // Si todos los campos están completos
        if (completados) {
            document.getElementById("mensajeExito").innerHTML = exito;
            window.setTimeout(function(){
                window.location.href = "./index.html";
            }, 5000);
            deleteCarrito();
        } else {
            displayToast("danger", "Falta completar campos, favor revise.")
            //alert("Falta completar campos, favor revise.");
        }
    } else {
        displayToast("warning", "Por favor selecciona una forma de pago.")
        //alert("Por favor selecciona una forma de pago.");
    }
});
     

    

