const express = require('express'); 
const { getFilteredProducts } = require('../controllers/products'); 

const router = express.Router(); 

router.get('/', getFilteredProducts); 

module.exports = router; 