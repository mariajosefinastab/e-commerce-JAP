document.addEventListener("DOMContentLoaded", function() {

        document.getElementById ("loginForm").addEventListener("submit",function(event) {
        event.preventDefault ();

        let email = document.getElementById("email");
        let password = document.getElementById("password");

         // Limpiar las clases de error antes de la validación
         email.classList.remove("is-invalid");
         password.classList.remove("is-invalid");

        if (email.value.trim() === "") {
            email.classList.add("is-invalid");

        }else if (password.value.trim() === ""){
            password.classList.add("is-invalid");
        } else {
            //Desafiate!
            localStorage.setItem("authenticated", "true");
            localStorage.setItem("email", email.value.trim()); 
            window.location.href = "products.html";
        }

    });
});









