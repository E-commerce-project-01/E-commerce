module.exports = (sequelize, DataTypes) => {
    const Brands = sequelize.define('Brands', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        volume: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        logo: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        floorprice: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        day: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        owner: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        verified: {
            type: DataTypes.BOOLEAN, // Changed to BOOLEAN
            allowNull: true,
        },
        items: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
    }, { timestamps: false });
    return Brands;
};