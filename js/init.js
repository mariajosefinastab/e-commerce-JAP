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
const btnSwitch = document.querySelector('#switch'); 

btnSwitch.addEventListener('click', () => {
    document.body.classList.toggle('dark')
    btnSwitch.classList.toggle('active')
})