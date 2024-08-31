//Verifica la autenticación del usuario en cada página protegida

document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem("authenticated") !== "true") {
        document.getElementById("user-email").textContent="identifiquese";
        setTimeout(function() {
            window.location.href = "login.html";
        }, 10000); 
    }else{
        //Desafiate E2
        let userEmail = localStorage.getItem("email");
        if(userEmail!=null){
            let userEmailVisualElement = document.getElementById("user-email");
            userEmailVisualElement.textContent = `Hola! ${userEmail}`;
        }
    }
});
