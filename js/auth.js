//Verifica la autenticación del usuario en cada página protegida

document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem("authenticated") !== "true") {
        setTimeout(function() {
            window.location.href = "login.html";
        }, 10000); 
    }else{
        //Desafiate E2
        //recuperas el localstorage de email
        //getelement by id username
        //

        let userEmail = localStorage.getItem("email");
        /*if (userEmail) {*/
            let userEmailVisualElement = document.getElementById("user-email");
            userEmailVisualElement.textContent = `Hola! ${userEmail}`;
        /*}*/
    }
});