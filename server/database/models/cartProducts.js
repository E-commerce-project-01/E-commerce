module.exports = (sequelize, DataTypes) => {
    const CartProducts = sequelize.define('CartProducts', {
        // Quantity of specific product in cart
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            validate: {
                min: 1  // Must have at least one item
            }
        },
        // Store price at time of purchase (prices might change over time)
        priceAtPurchase: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                min: 0
            }
        },
        // When the product was added to cart
        purchaseDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        timestamps: true  // Tracks createdAt and updatedAt
    });
    return CartProducts;
};