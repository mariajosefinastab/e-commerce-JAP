const url = "https://japceibal.github.io/emercado-api/cats_products/101.json";
//array con productos 
let productos = [];
//nombre de la categoría
let catName="";

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
    <div class="container" onclick="guardarIDProducto(${item.id})" type= >
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

function guardarIDProducto(id) {
  localStorage.setItem('idProducto', id);
  // Redirigir a la página de información del producto
  window.location.href = 'product-info.html';
}



