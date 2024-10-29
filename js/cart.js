<<<<<<< Updated upstream
=======




//cargas el DOM

//recuperas carrito

//verificar si el carrito esta vacio

    //si esta vacio muestro mensaje carrito vacio
    //si no:
    //para cada elemento del carrito lo mostras en pantalla. (con el diseño de fausto).

//===================================================================================================

// crear una funcion que reciba como argumento un id de producto
//obtener el carrito <-- fijate en las funciones que hizo josefina en el init.js
//modificar la cantidad de item que tuvo el evento
//guardar carrito

//llamar funcion de brian para que recargue el contenido


function actualizarCarrito (idProducto,sumaresta){
    let carrito = getCarrito();
  carrito.forEach(elemento => {
    if (elemento.id == idProducto){
            if (sumaresta == "suma") {
                addCarrito(elemento)
                //recargo la pagina --> brian part
            }
            if (sumaresta == "resta") {
                removeCarrito(elemento)
                //recargo la pagina --> brian part
            }

    }

        
    
  });

       
}

 
>>>>>>> Stashed changes
