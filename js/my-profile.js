
document.addEventListener("DOMContentLoaded", function() {
  //muestro foto de perfil
  displayProfilePhoto();

  const form = document.getElementById('registroForm');
  const nombreInput = document.getElementById('nombre');
  const apellidoInput = document.getElementById('apellido');
  const emailInput = document.getElementById('email');
  const segundoNombreInput = document.getElementById('segundoNombre');
  const segundoApellidoInput = document.getElementById('segundoApellido');
  const telefonoInput = document.getElementById('telefono');
  const button = document.querySelector('.btn-primary');


  let user = getUser();
  nombreInput.value = user.nombre;
  apellidoInput.value = user.apellido;
  emailInput.value = user.email;



  button.addEventListener('click', function(event) {
    console.log("entro funcion")

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
      user.nombre = nombreInput.value,
      user.segundoNombre = segundoNombreInput.value,
      user.apellido= apellidoInput.value,
      user.segundoApellido= segundoApellidoInput.value,
      user.email= emailInput.value,
      user.telefono= telefonoInput.value
      }

      // Guardar en almacenamiento local
      setUser(user);
      //Guardo foto de perfil
      saveData();
      //localStorage.setItem("userProfile", JSON.stringify(data));
      alert("Perfil guardado con éxito.");
    
  });
});

/*Funciones para guardar y mostrar foto de perfil*/
function displayProfilePhoto(){
  let user = getUser();
  let foto = user.foto;
  if(foto != ""){
      console.log("entre");
      console.log(foto);
      //let imgInput = 
      document.getElementById("profile").src = foto;
      //imgInput.setAttribute("src", foto);
  }
}

function saveData(){
  let user = getUser();
  let imgInput = document.getElementById("imgInput");
  if(imgInput.value != ""){
    if(imgInput.files[0].size > 1000000){
        console.log("imagen grande viejo");
        return false
    }

    const fr = new FileReader();
    fr.readAsDataURL(imgInput.files[0]);
    //event listener para cargar la foto.
    fr.addEventListener("load", ()=>{
        user.foto = fr.result;
        setUser(user);

/*Funciones para borrar informacion del localStorage*/
document.addEventListener("DOMContentLoaded", function() {
  const logoutButton = document.getElementById('cerrar-sesion');  
  logoutButton.addEventListener('click', function() {
    localStorage.removeItem(LOCALKEY);  
  });
});
        displayProfilePhoto();
    })
  }
}




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

