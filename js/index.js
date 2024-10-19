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


