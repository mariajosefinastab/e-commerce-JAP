// products.js

// Datos de productos en formato JSON
const productos = [
  {
    "id": 50921,
    "name": "Chevrolet Onix Joy",
    "description": "Generación 2019, variedad de colores. Motor 1.0, ideal para ciudad.",
    "cost": 13500,
    "currency": "USD",
    "soldCount": 14,
    "image": "img/prod50921_1.jpg"
  },
  {
    "id": 50922,
    "name": "Fiat Way",
    "description": "La versión de Fiat que brinda confort y a un precio accesible.",
    "cost": 14500,
    "currency": "USD",
    "soldCount": 52,
    "image": "img/prod50922_1.jpg"
  },
  {
    "id": 50923,
    "name": "Suzuki Celerio",
    "description": "Un auto que se ha ganado la buena fama por su economía con el combustible.",
    "cost": 12500,
    "currency": "USD",
    "soldCount": 25,
    "image": "img/prod50923_1.jpg"
  },
  {
    "id": 50924,
    "name": "Peugeot 208",
    "description": "El modelo de auto que se sigue renovando y manteniendo su prestigio en comodidad.",
    "cost": 15200,
    "currency": "USD",
    "soldCount": 17,
    "image": "img/prod50924_1.jpg"
  },
  {
    "id": 50925,
    "name": "Bugatti Chiron",
    "description": "El mejor hiperdeportivo de mundo. Producción limitada a 500 unidades.",
    "cost": 3500000,
    "currency": "USD",
    "soldCount": 0,
    "image": "img/prod50925_1.jpg"
  }
];

function mostrarProductos() {
  const contenedor = document.getElementById('showProducts');
  contenedor.innerHTML = ''; // Limpiar el contenedor antes de agregar productos
  
  productos.forEach(producto => {
    const productoElemento = document.createElement('div');
    productoElemento.classList.add('producto');
    productoElemento.innerHTML = `
      <div class="producto-img">
        <img src="${producto.image}" alt="${producto.name}">
      </div>
      <h2>${producto.name}</h2>
      <p>${producto.description}</p>
      <p>Precio: ${producto.cost} ${producto.currency}</p>
      <p>Vendidos: ${producto.soldCount}</p>
      <button onclick="guardarIDProducto(${producto.id})">Seleccionar</button>
    `;
    contenedor.appendChild(productoElemento);
  });
}

function guardarIDProducto(id) {
  localStorage.setItem('idProducto', id);
  // Redirigir a la página de información del producto
  window.location.href = 'product-info.html';
}

// Mostrar productos al cargar la página
document.addEventListener('DOMContentLoaded', mostrarProductos);


document.addEventListener("DOMContentLoaded", (event) => {
    console.log("");
    fetch(url)
    .then(response => response.json())
    .then(data => {  
    let response = 
    `<!-- Diseño de categorias desde acá -->
      <!-- titulos -->
      <div class="container">
        <div class="row mb-0 text-center">
          <div class="col-3"><p class="text-center">${data.catName}</p></div>
          <div class="col-5"></div>
          <div class="col unidades">Vendidos</div>
          <div class="col price">Precio</div>
        </div>
      </div>
    <hr class="mt-0"></hr>
    `;

    for (let i= 0 ;i < data.products.length; i++){
        response+= ` 
        <!-- Productos -->
        <div class="container">
          <div class="row mb-3 text-center fila">
            <!--imagen-->
            <div class="col">
              <img src="${data.products[i].image}" class="productImg rounded float-start" alt="...">
            </div>
            <!--Nombre y descripcion-->
            <div class="col-md-5 d-flex flex-column justify-content-center text-start info">
              <p class="fs-2">${data.products[i].name}</p>
              <p class="descripcion">${data.products[i].description}</p>
            </div>
            <!--Unidades vendidas-->
            <div class="col d-flex flex-column justify-content-center unidades">
              <p class="fs-6 unidades">${data.products[i].soldCount}</p>
            </div>
            <!--Precio-->
            <div class="col d-flex flex-column justify-content-center precio">
              <p class="fs-5">$${data.products[i].cost}${data.products[i].currency}</p>
            </div>
          </div>
        </div>
        `;
    }

    let content = document.getElementById("showProducts");
    content.innerHTML +=response;
  });
  });








