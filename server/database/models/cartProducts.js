module.exports = (sequelize, DataTypes) => {
    const CartProducts = sequelize.define('CartProducts', {
        CartId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'carts',
                key: 'id'
            }
        },
        ProductId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Products',
                key: 'id'
            }
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            validate: {
                min: 1
            }
        },
        priceAtPurchase: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    }, {
        timestamps: false,
        indexes: [
            {
                unique: true,
                fields: ['CartId', 'ProductId']
            }
        ]
    });

    return CartProducts;
};