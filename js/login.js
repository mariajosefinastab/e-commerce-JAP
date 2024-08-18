document.getElementById ("loginForm").addEventListener("submit",function(event) {
event.preventDefault ();
let email = document.getElementById("email").value.trim();
let passsword = document.getElementById("passowrd").value.trim();

if (email =="" || passsword =="" ) {
    alert("email o password vacios,favor complete");
}
else {
    window.location.href = "products.html";
}

})

;

