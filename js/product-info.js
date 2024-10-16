
url="https://japceibal.github.io/emercado-api/products/"

let catName="";

document.addEventListener("DOMContentLoaded", () => {
  //let idCat =  localStorage.getItem('catID');
  let idProducto = localStorage.getItem('idProducto');

  getJSONData(url+idProducto+".json").then(result => {
    if (result.status === "ok") {
      producto = result.data;
      displayProduct(producto, idProducto);
      displayRelated(producto);
    } else {
      alert("Error al cargar contenido");
    }
  });
  // Mostrar Comentarios 

  getJSONData(PRODUCT_INFO_COMMENTS_URL+idProducto+".json").then(result => {
    if (result.status === "ok") {
      comentarios = result.data;
      displayComments (comentarios,idProducto)
    } else {
      alert("Error al cargar contenido");
    }
  });
  // Mostrar Comentarios 

  getJSONData(PRODUCT_INFO_COMMENTS_URL+idProducto+".json").then(result => {
    if (result.status === "ok") {
      comentarios = result.data;
      displayComments (comentarios,idProducto)
    } else {
      alert("Error al cargar contenido");
    }
  });
  
  document.getElementById("cerrar-sesion").addEventListener("click", (event)=>{
    let email = localStorage.getItem("email");
    email = ""
    document.getElementById("user-email").innerHTML = ""
    window.location = "login.html"
    console.log(email);

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


// Declarar funcion mostrar comentarios

function displayComments (comentarios,idProducto) {
  
  // Mostrar una Calificacion 
  let content='';
   comentarios.forEach (comentario => {
    console.log(comentario);
        content += `
          <div>
            <p class="fw-bold">${comentario.user}</p>
            <p>${comentario.description}</p>
            <div class="row">
              <div class="col">
                <p>${comentario.dateTime}</p>
              </div>
           <div class="col text-end fs-3">
          `;
           for (let i = 1; i <= 5; i++) {
               content += `<label class="${i <= comentario.score ? 'checked' : ''}">&#9733;</label>`;
           }
            content += ` 
            </div>
            </div>
            <hr>
          </div>
        `;        
      }) 

  
  document.getElementById("mostrarComentarios").innerHTML = content; 
  
}

//-----------------------Comentario Nuevo-----------------------
  let sendButton = document.getElementById("send-comment")
sendButton.addEventListener("click", () => {

  let textComment = document.getElementById("text-comment").value;
  let user = getUser();
  let stars = ""
  var fecha = new Date();
  var fechaFormateada = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear();
 // console.log(fechaFormateada);

  for (let i = 1; i <= 5; i++) {
    if (i <= document.querySelector('input[name="rating"]:checked').value){
      stars += `<label title="${i} estrellas" class="checked">&#9733;</label>`
    }else{
      stars += `<label title="${i} estrellas">&#9733;</label>`
    };
  };

  let commentContent = 
  `<div>
      <p class="fw-bold">${user.nombre}</p>
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
  </div>`;
  document.getElementById("calificacionMostrar").innerHTML += commentContent;
  
  //calificacionMostrar
  sendButton.disabled = true; 
  
});


function displayRelated(producto){
  let content = '';
  producto.relatedProducts.forEach( rproduct =>{
    content += `
    <div class="card ms-3" style="width: 18rem;" onclick="goRelated(${rproduct.id})">
       <img src="${rproduct.image}" alt="Producto Relacionado" class="img-fluid mt-3">
      <div class="card-body">
        <h5 class="card-title">${rproduct.name}</h5>
      </div>
    </div>`;

  })
  document.getElementById("related").innerHTML = content;
}

function goRelated(id){
  localStorage.setItem('idProducto', id);
  window.location.href = "product-info.html";

}




//----------------------------------Menu desplegable----------------------------------
document.addEventListener("DOMContentLoaded", ()=>{
  document.getElementById("cerrar-sesion").addEventListener("click", (event)=>{
      let email = localStorage.getItem("email");
      email = ""
      document.getElementById("user-email").innerHTML = ""
      window.location = "login.html"
      console.log(email);

  });

})


document.getElementById("user-email").addEventListener("click", function(event) {
  //event.preventDefault(); // Evita el comportamiento por defecto del enlace
  var dropdown = document.getElementById("dropdown-menu");
  dropdown.classList.toggle("show");
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
      }
  }
}


