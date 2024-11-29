document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });

    document.getElementById("cerrar-sesion").addEventListener("click", (event)=>{
        let email = localStorage.getItem("email");
        email = ""
        document.getElementById("user-email").innerHTML = ""
        window.location = "login.html"
        console.log(email);

    });


});


