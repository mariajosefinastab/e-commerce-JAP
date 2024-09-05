const url = "https://japceibal.github.io/emercado-api/cats_products/101.json";
//array con productos 
let productos = [];
//nombre de la categoría
let catName="";

document.addEventListener("DOMContentLoaded", (event) => {
    //recupero contenido
    getJSONData(url)
      .then(result=>{
        if(result.status == "ok"){
          //se guarda la respuesta.
          productos = result.data.products;
          catName=result.data.catName;
          displayProducts(productos, catName);
        }else{
          //devolvio error :(
          alert("Error al cargar contenido");
        }
      })
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
    content+= ` 
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

  document.getElementById("showProducts").innerHTML +=content;
}








