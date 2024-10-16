
document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById('registroForm');
  const nombreInput = document.getElementById('nombre');
  const apellidoInput = document.getElementById('apellido');
  const emailInput = document.getElementById('email');
  const segundoNombreInput = document.getElementById('segundoNombre');
  const segundoApellidoInput = document.getElementById('segundoApellido');
  const telefonoInput = document.getElementById('telefono');
  const button = document.querySelector('.btn-primary');

  const userLoggedIn = localStorage.getItem("userLoggedIn");

  // Verifica si el usuario está logueado
  if (!userLoggedIn) {
    alert("Debes iniciar sesión para acceder a tu perfil.");
    window.location.href = "login.html";
  } else {
    
    emailInput.value = userLoggedIn;
  }

  button.addEventListener('click', function(event) {
    event.preventDefault();

    let isValid = true;


    if (nombreInput.checkValidity()) {
      nombreInput.classList.remove('is-invalid');
      nombreInput.classList.add('is-valid');
    } else {
      nombreInput.classList.remove('is-valid');
      nombreInput.classList.add('is-invalid');
      isValid = false;
    }

    if (apellidoInput.checkValidity()) {
      apellidoInput.classList.remove('is-invalid');
      apellidoInput.classList.add('is-valid');
    } else {
      apellidoInput.classList.remove('is-valid');
      apellidoInput.classList.add('is-invalid');
      isValid = false;
    }

    if (emailInput.checkValidity()) {
      emailInput.classList.remove('is-invalid');
      emailInput.classList.add('is-valid');
    } else {
      emailInput.classList.remove('is-valid');
      emailInput.classList.add('is-invalid');
      isValid = false;
    }

    // Si todos los campos son válidos guardar en localStorage
    if (isValid) {
      const data = {
        nombre: nombreInput.value,
        segundoNombre: segundoNombreInput.value,
        apellido: apellidoInput.value,
        segundoApellido: segundoApellidoInput.value,
        email: emailInput.value,
        telefono: telefonoInput.value,
      };

      // Guardar en almacenamiento local
      localStorage.setItem("userProfile", JSON.stringify(data));
      alert("Perfil guardado con éxito.");
    }
  });
});






//----------------------------------Menu desplegable----------------------------------


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

