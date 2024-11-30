document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("loginForm").addEventListener("submit", async function(event) {
        event.preventDefault();

        let email = document.getElementById("email");
        let password = document.getElementById("password");

        // Limpiar las clases de error antes de la validación
        email.classList.remove("is-invalid");
        password.classList.remove("is-invalid");

        if (email.value.trim() === "") {
            email.classList.add("is-invalid");
        } else if (password.value.trim() === "") {
            password.classList.add("is-invalid");
        } else {
            //hago login en backend
            let token = await getJSONData(LOGIN_URL, "POST", {"username":email.value.trim(), "password":password.value.trim()});
            console.log("response login", token);
            //Guardar el estado de autenticación y el email
            let user = getUser();
            user.authenticated = "true";
            user.email = email.value.trim();
            user.token = token.data.token;
            setUser(user);
            window.location.href = "categories.html";
        }
    });
});








