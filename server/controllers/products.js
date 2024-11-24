const { Op } = require('sequelize')
const { products } = require('../database/index')

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
    getFilteredProducts
}
