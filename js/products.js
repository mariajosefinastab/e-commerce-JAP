 HEAD
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


const url = "https://japceibal.github.io/emercado-api/cats_products/101.json";
//array con productos 
let producto = [];
//nombre de la categoría
let catName="";
 d5419e8b738c456b25b46165eea36237d900473

document.addEventListener("DOMContentLoaded", () => {
  getJSONData(url).then(result => {
    if (result.status === "ok") {
      productos = result.data.products;
      catName = result.data.catName;
      displayProducts(productos, catName);

      // Filtros
      document.getElementById("filterBtn").addEventListener("click", () => {  //Toma click en filtro para aplicar las siguientes funciones
        const minPrice = parseFloat(document.getElementById("minPrice").value) || 0;  //Toma valor mínimo de campo de entrada y lo pasa a valor numérico, si no hay valor usa 0
        const maxPrice = parseFloat(document.getElementById("maxPrice").value) || Infinity;  //Toma valor máximo de campo de entrada y lo pasa a valor numérico, si no hay valor usa 0
        const filteredProducts = productos.filter(item => item.cost >= minPrice && item.cost <= maxPrice); //Filstra según rango de precios
        displayProducts(filteredProducts, catName);
      });

      // Ordenación
      document.getElementById("sortBy").addEventListener("change", (e) => {
        const sortValue = e.target.value;
        let sortedProducts;

        switch (sortValue) {
          case "priceAsc":
            sortedProducts = [...productos].sort((a, b) => a.cost - b.cost);
            break;
          case "priceDesc":
            sortedProducts = [...productos].sort((a, b) => b.cost - a.cost);
            break;
          case "soldCountDesc":
            sortedProducts = [...productos].sort((a, b) => b.soldCount - a.soldCount); //Vendidos descendente
            break;
          default:
            sortedProducts = productos;
        }
        displayProducts(sortedProducts, catName);
      });
    } else {
      alert("Error al cargar contenido");
    }
  });
});


//Funcion recibe el array de productos y lo muestra en pantalla.
//listado es array con productos, catName es el nombre de la categoria
function displayProducts(listado, catName){
  console.log(listado);
  let content = 
  `<!-- Diseño de categorias desde acá -->
    <!-- titulos -->
    <div class="container">
      <div class="row mb-0 text-center">
        <div class="col-3"><p class="text-center">${catName}</p></div>
        <div class="col-5"></div>
        <div class="col unidades">Vendidos</div>
        <div class="col price">Precio</div>
      </div>
    </div>
  <hr class="mt-0"></hr>
  `;
  listado.forEach(item => {
    content += ` 
    <!-- Productos -->
    <div class="container">
      <div class="row mb-3 text-center fila">
        <!--imagen-->
        <div class="col">
          <img src="${item.image}" class="productImg rounded float-start" alt="...">
        </div>
        <!--Nombre y descripcion-->
        <div class="col-md-5 d-flex flex-column justify-content-center text-start info">
          <p class="fs-2">${item.name}</p>
          <p class="descripcion">${item.description}</p>
        </div>
        <!--Unidades vendidas-->
        <div class="col d-flex flex-column justify-content-center unidades">
          <p class="fs-6 unidades">${item.soldCount}</p>
        </div>
        <!--Precio-->
        <div class="col d-flex flex-column justify-content-center precio">
          <p class="fs-5">$${item.cost}${item.currency}</p>
        </div>
      </div>
    </div>
    `;
  });

  document.getElementById("showProducts").innerHTML = content; //Saco +
}








