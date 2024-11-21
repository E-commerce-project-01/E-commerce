const express = require('express'); 
const { getFilteredProducts,getProductCountsByBrand } = require('../controllers/products'); 

const router = express.Router(); 

router.get('/', getFilteredProducts); 

router.get("/:brandId", getProductCountsByBrand);

module.exports = router; 