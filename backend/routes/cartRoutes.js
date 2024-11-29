const express = require('express');
const router = express.Router();

let cart = [];

// Obtener los productos del carrito
router.get('/', (req, res) => {
    res.json(cart);
});

// Agregar un producto al carrito
router.post('/add', (req, res) => {
    const product = req.body;  
    cart.push(product);
    res.status(200).send('Producto agregado al carrito');
});

// Eliminar un producto del carrito
router.delete('/remove/:id', (req, res) => {
    const productId = req.params.id;
    cart = cart.filter(product => product.id !== productId);  // Elimina el producto con el id proporcionado
    res.status(200).send('Producto eliminado del carrito');
});

module.exports = router;