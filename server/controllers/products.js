const db = require("../database/index");

const getProductCountsByBrand = async (req, res) => {
    const brandId = req.params.brandId;

    try {
        const productCounts = await db.products.findAll({
            attributes: [
                'brandId', 
                [db.sequelize.fn('COUNT', db.sequelize.col('id')), 'product_count']
            ],
            include: [{
                model: db.brands,
                attributes: ['id', 'name'] 
            }],
            group: ['brandId'],
        });

        res.json(productCounts);
    } catch (error) {
        console.error("Error fetching product counts by brand:", error);
        res.status(500).send("Failed to fetch product counts");
    }
};

module.exports = {
    getProductCountsByBrand,
};