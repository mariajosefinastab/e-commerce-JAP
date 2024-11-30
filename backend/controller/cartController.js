const cartModel = require("../models/cartModel");


//obtiene los elementos
const getCart = async (req, res) => {
  console.log("Controller: getCart");
  let carrito = await cartModel.getCart();
  if(carrito!=false){
    res.status(200).json(carrito); 
  }else{
    res.status(200).json({items:[]});
  }
}

//agrega un elemento
const setCart = async (req, res) => {
  console.log("Controller: setCart")
  let carrito = req.body;
  let result = false;
  console.log(carrito)
  //tengo elementos con mismo id?
  let checkItem = await cartModel.checkItem(carrito.id);
  if(checkItem){
    //SI
    result = await cartModel.addItem(carrito.id);
  }else{
    //NO
    result = await cartModel.setCart(carrito);
  }
  if(result != false){
    return res.status(200).json("agregado");
  }
};

//sube una unidad
//Para subir una unidad, pasa el elemento entero man

//baja una unidad
const deleteCartId = async (req, res) => {
  let id = req.params.id;
  console.log("Controller deleteCartId", id);
  if(id !== undefined){
    let result = cartModel.restCart(id);
    if(result != false){
      return res.status(200).json("eliminado");
    }
  }else{
    return res.status(400).json("Bad request");
  }

}


module.exports = {setCart, getCart, deleteCartId};


