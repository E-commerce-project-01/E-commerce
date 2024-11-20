module.exports = (sequelize, DataTypes) => {
    const cart = sequelize.define('cart', {
        // Track total number of items in the cart
        totalItems: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0  // Can't have negative items
            }
        },
        // Track total monetary amount in the cart
        totalAmount: {
            type: DataTypes.DECIMAL(10, 2),  // 10 digits with 2 decimal places for currency
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0  // Can't have negative amount
            }
        }
    }, {
        timestamps: true  // Tracks createdAt and updatedAt
    });
    return cart;
};