const queryDB = require('./db');

async function setCart(item){
    console.log("setCart");
    let {id, nombre, descripcion, precio, moneda, cantidad, vendidos, imagen} = item;

    let query = `INSERT INTO cart (id, nombre, descripcion, precio, moneda, cantidad, vendidos, imagen)
    VALUES (${id}, "${nombre}", "${descripcion}", ${precio}, "${moneda}", ${cantidad}, ${vendidos}, "${imagen}")`;

    let result = await queryDB(query);
    console.log("SetCart result", result)
    return true;
}

async function getCart(){
    let query =  "select * from cart";
    let result = await queryDB(query);
    let response = {items : result};
    return response;
}

async function checkItem(id){
    console.log("Model checkItem",id);
    let query = `select * from cart where id = ${id}`;
    let result = await queryDB(query);
    if(result.length > 0){
        return true
    }else{
        return false
    }
}

async function addItem(id){
    console.log("Modal addItem", id);
    let query = `update cart set cantidad = cantidad + 1 where id = ${id}`;
    let result = await queryDB(query);
    console.log(result);
    return result;
}

async function restCart(id){
    console.log("Modal restCart", id);
    let result = await queryDB(`select cantidad from cart where id = ${id}`);
    //Hay mas de un elemento?
    cantidad = result[0].cantidad;
    console.log("restCart cantidad:",cantidad)
    if(cantidad > 1 ){
        //SI
        console.log("restCart: mas de uno, bajo uno")
        query = `update cart set cantidad = cantidad -1 where id = ${id}`
    }else{
        //NO
        console.log("restCart: borro el elemento")
        query = `delete from cart where id = ${id}`
    }
    result = await queryDB(query);
    console.log(result);
    return result;
}

module.exports = {setCart, getCart, checkItem, addItem, restCart};