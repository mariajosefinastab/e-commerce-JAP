const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
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

//Agregar otro elemento que sea carrito para guardar el elemento //id del producto, cantidad, etc
//Y hacer función getCarrito, que devuelva todo el carrito, y otra addCarrito que le paso el productoComprado y lo agrega, tener en cuenta que si tengo más de una banana sea banana = "; y no banana banana

document.addEventListener("DOMContentLoaded", ()=>{
  user = getUser();
  if(document.body.className != user.theme){
    tema();
  }

})

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
