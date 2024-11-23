const db = require("../database/index");

const getProductCountsByBrand = async (req, res) => {
    const brandId = req.params.brandId; // Get the brand ID from the request parameters

    try {
        const products = await db.products.findAll({
            where: { brandId }, // Filter products by the specified brand ID
            include: [{
                model: db.brands,
                attributes: ['id', 'name'] // Include brand details if needed
            }]
        });

        if (products.length === 0) {
            return res.status(404).json({ message: "No products found for this brand." });
        }

        res.json(products); // Send the products as a JSON response
    } catch (error) {
        console.error("Error fetching products by brand ID:", error);
        res.status(500).send("Failed to fetch products");
    }
};
const { Op } = require('sequelize');
const { products } = require('../database/index');


const getFilteredProducts = (req, res) => {
    const { category, priceRange, rarity, status, onSale, chains, sort } = req.query
    const whereClause = {}
    const orderClause = []

    if (category) {
        whereClause.collection = category
    }

    if (rarity) {
        whereClause.rarity = rarity
    }

    if (status) {
        whereClause.status = status
    }

    if (chains) {
        whereClause.chains = { [Op.like]: `%${chains}%` }
    }

    if (onSale === 'true') {
        whereClause.onSale = true
    }

    if (priceRange) {
        const [minPrice, maxPrice] = priceRange.split('-').map(Number)
        if (!isNaN(minPrice)) {
            whereClause.price = {
                [Op.gte]: minPrice
            }
        }
        if (!isNaN(maxPrice)) {
            whereClause.price = {
                ...whereClause.price,
                [Op.lte]: maxPrice
            }
        }
    }

    if (sort) {
        if (sort === 'price_asc') {
            orderClause.push(['price', 'ASC'])
        } else if (sort === 'price_desc') {
            orderClause.push(['price', 'DESC'])
        } else if (sort === 'newest') {
            orderClause.push(['createdAt', 'DESC'])
        }
    }


    products.findAll({ where: whereClause, order: orderClause })
        .then(filteredProducts => {
            console.log("Filtered products:", filteredProducts)
            res.json(filteredProducts)
        })
        .catch(error => {
            console.error('Error retrieving products:', error)
            res.status(500).json({ message: "Error retrieving products." })
        })
}

module.exports = {
    getFilteredProducts,getProductCountsByBrand
};
