
url="https://japceibal.github.io/emercado-api/products/"
let catName="";

document.addEventListener("DOMContentLoaded", () => {
  //let idCat =  localStorage.getItem('catID');
  let idProducto = localStorage.getItem('idProducto');

  getJSONData(url+idProducto+".json").then(result => {
    if (result.status === "ok") {
      producto = result.data;
      displayProduct(producto, idProducto);
    } else {
      alert("Error al cargar contenido");
    }
  });

});

function displayProduct(producto, idProducto){
  //Aca desplegas el diseño
  console.log(producto);
  let content = 
     `<!-- Categoría -->
        <div class="container">
          <div class="row text-start fs-3" >
            <p>${catName}</p>
            <hr> 
          </div>
        </div>
        <!-- Productos -->
        <div class="container">
          <div class="row">
            <div class="col">
            <! -- carousel -->
            <div id="carouselImagenes" class="carousel slide">
              <div id="carousel" class="carousel-inner">`;

              producto.images.forEach(image => {
                content +=`<div class="carousel-item">
                  <img src="${image}" class="d-block w-100">
                </div>`;
              });

               content +=`</div>
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselImagenes" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselImagenes" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
            </div>
            <!-- Segunda columna -->
            <div class="col-4">
            <!--Nombre y descripcion-->
            <div class='my-5'>
              <h2 class="fs-1 text">${producto.name}</h2>
            </div>
            <div class="row mt-2 text-start">
              <!--Precio-->
              <p class="col fs-3 text">$${producto.cost}${producto.currency}</p>
              <!--Unidades vendidas-->
              <p class="col fs-3 text" >Vendidos: ${producto.soldCount}</p>
            </div>
          <p class="fs-5 text text-start mt-5">${producto.description}</p>
        </div>
      </div>
    </div>`;
  
  document.getElementById("product-info").innerHTML = content; 
  document.getElementsByClassName("carousel-item")[0].classList.add("active");

}
//-----------------------Comentario Nuevo-----------------------

document.getElementById("send-comment").addEventListener("click", () => {

  let textComment = document.getElementById("text-comment").value;
  let email = localStorage.getItem("email");
  let stars = ""
  var fecha = new Date();
  var fechaFormateada = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear();
 // console.log(fechaFormateada);

  for (let i = 1; i <= 5; i++) {
    if (i <= document.querySelector('input[name="rating"]:checked').value){
      stars += 
    `
    <label title="${i} estrellas" class= "checked">&#9733;</label>

    `
    }else{
      stars += 
    `
    <label title="${i} estrellas">&#9733;</label>

    `
    };

  };

  let commentContent = 

  `
   <div>
      <p class="fw-bold">${email}</p>

      <p>${textComment}</p>

      <div class="row">
  
        <div class="col">

          <p>${fechaFormateada}</p>
        </div>
        <div class="col text-end fs-3">
          ${stars}
        </div>

      </div>
      <hr>
    </div>
     
      
  `
  document.getElementById("calificacionMostrar").innerHTML += commentContent;

  
});

