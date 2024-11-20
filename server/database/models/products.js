module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        // Product rarity classification
        rarity: {
            type: DataTypes.ENUM('Secret Rare', 'Uncommon Rare', 'Ultra Rare'),
            allowNull: false,
        },
        // Product name/title with character limit
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        // Price with decimal precision for currency
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                min: 0  // Price can't be negative
            }
        },
        // URL for product image
        image: {
            type: DataTypes.STRING(1000),
            allowNull: false,
            validate: {
                isUrl: true  // Ensures valid URL format
            }
        },
        // Product availability status
        status: {
            type: DataTypes.ENUM('New', 'Available', 'Not Available'),
            allowNull: false,
            defaultValue: 'Available'
        },
        // Blockchain chains info
        chains: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Boolean flag for sales
        onSale: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        // Product category
        collection: {
            type: DataTypes.ENUM('Shoes', 'Dresses', 'Coats', 'Shirts', 'Pants'),
            allowNull: false,
        },
        // Inventory tracking
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0  // Can't have negative stock
            }
        }
    }, {
        timestamps: true  // Tracks createdAt and updatedAt
    });
    return Product;
};