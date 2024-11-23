const express = require('express'); 
const { getFilteredProducts,getProductbybrand} = require('../controllers/products'); 

const router = express.Router(); 

router.get('/', getFilteredProducts); 

router.get("/:brandId", getProductbybrand);


module.exports = router; 