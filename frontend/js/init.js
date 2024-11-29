const CATEGORIES_URL = "http://localhost:3000/categories/";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:3000/products/commentproducts/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const COTIZACION_DOLAR_URL = "https://uy.dolarapi.com/v1/cotizaciones/usd";
const EXT_TYPE = ".json";
const LOCALKEY = "ecomercejap";
let ADOLAR = 1;
let APESO = 1;

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

let defaultCarrito = {
  items: []
};
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
  badgeCarrito();
});

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

function removeCarrito(productoComprado) {
  let carrito = getCarrito();
  let existingItem = carrito.items.find(item => item.id === productoComprado.id);

  if (existingItem && existingItem.cantidad>1){
    existingItem.cantidad -= 1; 
  } else {
    // - eliminar producto carrito
    carrito.items = carrito.items.filter(item => item.id !== productoComprado.id);
  }
  // Actualizar el localStorage
  localStorage.setItem("carrito", JSON.stringify(carrito)); 
}

//borro carrito
function deleteCarrito(){
  localStorage.setItem("carrito", JSON.stringify(defaultCarrito)); 
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

/* Cambiar tema */
const btnSwitch = document.querySelector('#switch'); 
btnSwitch.addEventListener('click', tema);

function tema(){
  let btnSwitch = document.querySelector('#switch'); 
  btnSwitch.classList.toggle('active');

  document.body.classList.toggle('dark');
  let user = getUser();

  if(document.body.className == "dark"){
    user.theme = "dark";
  }else{
    user.theme = "";
  }
  console.log(user.theme)
  setUser(user);
}


/* Dropdown button y cerrar sesion */
document.getElementById("user-email").addEventListener("click", function(event) {
  //event.preventDefault(); // Evita el comportamiento por defecto del enlace
  var dropdown = document.getElementById("dropdown-menu");
  dropdown.classList.toggle("show");

  document.getElementById("cerrar-sesion").addEventListener("click", (event)=>{
      let email = localStorage.getItem("email");
      email = ""
      document.getElementById("user-email").innerHTML = ""
      window.location = "login.html"
      console.log(email);

  });

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


//Cambio de moneda
async function cotizacionDolar(){
  let cambio =  await getJSONData(COTIZACION_DOLAR_URL);
  ADOLAR = cambio.data.compra;
  APESO =  cambio.data.venta;
};

//Badge
function badgeCarrito(){
  let pCarrito = document.getElementById("badgeCarrito");
  let carrito = getCarrito();
  let cantidadCarrito = 0;
  carrito.items.forEach(element => {
    cantidadCarrito += element.cantidad;
  });
  pCarrito.textContent = cantidadCarrito;
  console.log("badgeCarrito:", cantidadCarrito)
}


//TOAST
function displayToast(severity, message){
  const toast = document.getElementById('liveToast');
  let toastbody = document.getElementById('toast-body');
  toastbody.innerHTML=message;
  toast.className="toast";

  switch(severity){
    case "danger":
      toast.classList.add("bg-danger");
    break;
    case "warning":
      toast.classList.add("bg-warning");
    break;
    case "success":
      toast.classList.add("bg-success");
    break;
    default:
      toast.classList.add("bg-success");
    break;
  }
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast);
  toastBootstrap.show();
}