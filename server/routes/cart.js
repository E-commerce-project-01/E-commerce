const express = require('express');
const { addToCart } = require('../controllers/cartProducts');
const { getCart } = require('../controllers/Cart');
const { removeFromCart } = require('../controllers/cartProducts');

const router = express.Router();

router.get('/itemcart', getCart);
router.post('/add', addToCart);
router.delete('/remove/:productId', removeFromCart);



module.exports = router;