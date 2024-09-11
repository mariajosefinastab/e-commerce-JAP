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




  console.log("Producto:"+products);
  console.log("id:"+idProducto);
}











// Datos de productos en formato JSON (deberías usar una API o fuente de datos real en un entorno de producción)
/*const productos = [
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
  
  function mostrarInformacionProducto() {
    const idProducto = localStorage.getItem('idProducto');
    
    if (idProducto) {
      const producto = productos.find(p => p.id === parseInt(idProducto));
      
      if (producto) {
        document.getElementById('nombreProducto').textContent = producto.name;
        document.getElementById('descripcionProducto').textContent = producto.description;
        document.getElementById('precioProducto').textContent = `Precio: ${producto.cost} ${producto.currency}`;
        document.getElementById('vendidosProducto').textContent = `Vendidos: ${producto.soldCount}`;
        document.getElementById('imagenProducto').src = producto.image;
      } else {
        document.getElementById('product-info').innerHTML = '<p>Producto no encontrado.</p>';
      }
    } else {
      document.getElementById('product-info').innerHTML = '<p>ID de producto no encontrado.</p>';
    }
  }
  
  // Mostrar la información del producto cuando la página se carga
  document.addEventListener('DOMContentLoaded', mostrarInformacionProducto);/*/
  