const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";


let carrito = {
  items: []
};

document.addEventListener("DOMContentLoaded", ()=>{
  user = getUser();
  carrito = JSON.parse(localStorage.getItem("carrito")) || { items: [] }; // Cargar carrito
  if(document.body.className != user.theme){
    tema();
  }

})

//functions del User

function getCarrito(){ //devuelve todos los elementos del carrito
  return carrito.items;
}

function addCarrito(productoComprado) {
  if (!localStorage.getItem("carrito")) {
    carrito = { items: [] }; 
  } else {
    carrito = JSON.parse(localStorage.getItem("carrito")); // carga carrito existente
  }

  let existingItem = carrito.items.find(item => item.id === productoComprado.id);

  if (existingItem) {
    existingItem.cantidad += 1; 
  } else {
    carrito.items.push(productoComprado); // + nuevo producto al carrito
  }

  // Actualizar el localStorage
  localStorage.setItem("carrito", JSON.stringify(carrito));
}


let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}
