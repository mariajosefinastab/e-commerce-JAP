document.getElementById ("loginForm").addEventListener("submit",function(event) {
event.preventDefault ();

let email = document.getElementById("email");
let passsword = document.getElementById("password");

if (email.value.trim() === "") {
    email.classList.add("is-invalid");

}else if (passsword.value.trim() === ""){
    passsword.classList.add("is-invalid");
} else {
    
    //Desafiate!

    localStorage.setItem("authenticate", "true");
    window.location.href = "products.html";
}

});









