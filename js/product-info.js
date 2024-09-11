
url="https://japceibal.github.io/emercado-api/cats_products/"
let catName="";

document.addEventListener("DOMContentLoaded", () => {
  let idCat =  localStorage.getItem('catID');
  let idProducto = localStorage.getItem('idProducto');

  getJSONData(url+idCat+".json").then(result => {
    if (result.status === "ok") {
      productos = result.data.products;
      catName = result.data.catName;
      console.log(productos);
      displayProduct(productos, idProducto);
    } else {
      alert("Error al cargar contenido");
    }
  });

});

function displayProduct(products, idProducto){
  //Aca desplegas el diseño
  console.log(products);
  const productoAMostrar = products.find(p => p.id === parseInt(idProducto));
  let content = 
     ` 
    <!-- Categoría -->
    <div class="container">
      <div class="row text-start fs-3" >
        <p>${catName}</p>
        <hr> 
      </div>
    </div>
    <!-- Productos -->
    <div class="container">
      <div class="row">
        <!--imagen-->
        <div class="col-8 d-flex justify-content-start">
          <img src="${productoAMostrar.image}" class="productImg" alt="...">
        </div>
        <div class="col-4">
          <!--Nombre y descripcion-->
          <div class='my-5'>
            <h2 class="fs-1 text">${productoAMostrar.name}</h2>
          </div>
          <div class="row mt-2 text-start">
            <!--Precio-->
            <p class="col fs-3 text">$${productoAMostrar.cost}${productoAMostrar.currency}</p>
            <!--Unidades vendidas-->
            <p class="col fs-3 text" >Vendidos: ${productoAMostrar.soldCount}</p>
          </div>
          <p class="fs-5 text text-start mt-5">${productoAMostrar.description}</p>
        </div>
      </div>
    </div>
    `;
  

  document.getElementById("product-info").innerHTML = content; 
}
