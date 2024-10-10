document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('registroForm');
    const nombreInput = document.getElementById('nombre');
    const apellidoInput = document.getElementById('apellido');
    const emailInput = document.getElementById('email');
  
    button.addEventListener('click', function(event) {
      /* event.preventDefault(); */
  

    if (nombreInput.checkValidity()) {
        nombreInput.classList.remove('is-invalid');
        nombreInput.classList.add('is-valid');
      } else {
        nombreInput.classList.remove('is-valid');
        nombreInput.classList.add('is-invalid');
      }
  

    if (apellidoInput.checkValidity()) {
        apellidoInput.classList.remove('is-invalid');
        apellidoInput.classList.add('is-valid');
      } else {
        apellidoInput.classList.remove('is-valid');
        apellidoInput.classList.add('is-invalid');
      }
  

    if (emailInput.checkValidity()) {
        emailInput.classList.remove('is-invalid');
        emailInput.classList.add('is-valid');
      } else {
        emailInput.classList.remove('is-valid');
        emailInput.classList.add('is-invalid');
      }
    });
});



//function colorear

/* function isValid(elemento){
    elemento,classList.remove('is-valid')
    elemento.classList.remove('is-invalid')
} */