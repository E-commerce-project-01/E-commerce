const { Op } = require('sequelize');
const { products } = require('../database/index');

const getFilteredProducts = (req, res) => {
    const { category, priceRange, rarity, status, onSale, chains } = req.query;
    const whereClause = {};

    if (category) {
        whereClause.collection = category; 
    }

    if (rarity) {
        whereClause.rarity = rarity;
    }

    if (status) {
        whereClause.status = status;
    }

    if (chains) {
        whereClause.chains = { [Op.like]: `%${chains}%` }; 
    }

    if (onSale === 'true') { 
        whereClause.onSale = true; 
    }

    if (priceRange) {
        const [minPrice, maxPrice] = priceRange.split('-').map(Number);
        if (!isNaN(minPrice)) {
            whereClause.price = {
                [Op.gte]: minPrice, 
            };
        }
        if (!isNaN(maxPrice)) {
            whereClause.price = {
                ...whereClause.price,
                [Op.lte]: maxPrice, 
            };
        }
    }

    console.log("Where clause:", whereClause);

    products.findAll({ where: whereClause })
        .then(filteredProducts => {
            console.log("Filtered products:", filteredProducts); 
            res.json(filteredProducts);
        })
        .catch(error => {
            console.error('Error retrieving products:', error); 
            res.status(500).json({ message: "Error retrieving products." });
        });
};
module.exports = {
    getFilteredProducts,
};