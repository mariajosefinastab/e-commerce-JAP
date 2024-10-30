const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
<<<<<<< Updated upstream
=======
const LOCALKEY = "ecomercejap";

let defaultUser={
  "user":{
    "nombre":"",
    "segundoNombre":"",
    "apellido":"",
    "segundoApellido":"",
    "telefono":"",
    "email":"",
    "foto":"",
    "authenticated":"false",
    "theme":""
  }
}

let carrito = {
  items: []
};

//Agregar otro elemento que sea carrito para guardar el elemento //id del producto, cantidad, etc
//Y hacer función getCarrito, que devuelva todo el carrito, y otra addCarrito que le paso el productoComprado y lo agrega, tener en cuenta que si tengo más de una banana sea banana = "; y no banana banana

document.addEventListener("DOMContentLoaded", ()=>{
  user = getUser();
  if(document.body.className != user.theme){
    tema();
  }
  
  badgeCarrito()
})

//          Badge Carrito





function badgeCarrito(){
  let pCarrito = document.getElementById("badgeCarrito");
  
  let carrito = getCarrito();
  let cantidadCarrito = 0;
  
    carrito.items.forEach(element => {
      cantidadCarrito += element.cantidad;
     
    });

  pCarrito.textContent = cantidadCarrito;
 
}

/*function primerProductoCarrito(){
  let pCarrito = document.getElementById("badgeCarrito");
  let textpCarrito = document.getElementById("badgeCarrito").textContent;
  let primerProducto = 1
  if (textpCarrito == ""){
    pCarrito.textContent = 1;
  }
  
}
*/



//functiones carrito
function getCarrito(){ 
  //devuelve todos los elementos del carrito
  if (!localStorage.getItem("carrito")) {
    carrito = { items: [] }; 
  } else {
    carrito = JSON.parse(localStorage.getItem("carrito")); // carga carrito existente
  }
  return carrito;

}

function addCarrito(productoComprado) {
  let carrito = getCarrito();
  let existingItem = carrito.items.find(item => item.id === productoComprado.id);

  if (existingItem) {
    existingItem.cantidad += 1; 
  } else {
    carrito.items.push(productoComprado); // + nuevo producto al carrito
  }
  // Actualizar el localStorage
  localStorage.setItem("carrito", JSON.stringify(carrito)); 
}


//funciones usuario
function getUser(){
  let data = JSON.parse(localStorage.getItem(LOCALKEY));
  if(data == null){
    return defaultUser.user;
  }
  return data.user;
}

function setUser(usuario){
  let data = JSON.parse(localStorage.getItem(LOCALKEY));
  if(data == null){
    data = defaultUser;
  }
  data.user = usuario;
  localStorage.setItem(LOCALKEY,JSON.stringify(data));
  return true;
}


>>>>>>> Stashed changes

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