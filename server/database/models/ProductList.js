module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product',
        {
            rarity: {
                type: DataTypes.ENUM('Secret Rare', 'Uncommon Rare','Ultra Rare'),
                allowNull: false,
            },
            title: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            price: {
                type: DataTypes.DECIMAL,
                allowNull: false,
            },
            image: {
                type: DataTypes.TEXT,
                allowNull: false,
            },

            statuts: {
                type: DataTypes.ENUM('New', 'Available','Not Available'),
                allowNull: false, 
            },
            chains: {
                type: DataTypes.STRING,
                allowNull: false, 
            },
            OnSaleIn: {
                type: DataTypes.ENUM('isSale', 'isnotSALE'),
            },
            collections: {
                type: DataTypes.ENUM('Summer', 'Autumn','Winter','Spring'),
                allowNull: false, 
            }
        },
        {
            timestamps: false, 
        }
    );

    return Product;
};
