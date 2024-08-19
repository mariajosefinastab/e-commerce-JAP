//Verifica la autenticación del usuario en cada página protegida

document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem("authenticated") !== "true") {
        setTimeout(function() {
            window.location.href = "login.html";
        }, 10000); 
    }
});