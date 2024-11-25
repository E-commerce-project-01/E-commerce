const express = require('express'); 
const { getFilteredProducts,getProductbybrand,incrementownercount, decrementownercount,updateproductbyId} = require('../controllers/products'); 

const router = express.Router(); 

router.get('/', getFilteredProducts); 

router.get("/:brandId", getProductbybrand);
router.post("/increment/:productId", incrementownercount);
router.post('/decrement/:productId', decrementownercount); // Decrement owner count
router.put('/:productId', updateproductbyId);

module.exports = router; 