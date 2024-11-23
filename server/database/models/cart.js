module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('cart', {
        // Ajoutez une clé étrangère pour l'utilisateur
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users', // Le nom de la table des utilisateurs
                key: 'id' // La clé primaire de la table des utilisateurs
            }
        },
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

    // Définir la relation avec le modèle User
    Cart.associate = (models) => {
        Cart.belongsTo(models.Users, { foreignKey: 'userId' });
    };

    return Cart;
};