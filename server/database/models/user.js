module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        firstName: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        avatar: {
            type: DataTypes.STRING(1000),
            allowNull: true,
            validate: {
                isUrl: true
            }
        },
        background: {
            type: DataTypes.STRING(1000),
            allowNull: true,
            validate: {
                isUrl: true
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        day: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                min: 1,
                max: 31
            }
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                min: 1900,
                max: new Date().getFullYear()
            }
        },
        month: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIn: [['January', 'February', 'March', 'April', 'May', 'June', 
                        'July', 'August', 'September', 'October', 'November', 'December']]
            }
        },
        type: {
            type: DataTypes.ENUM('user', 'admin'),
            allowNull: false,
            defaultValue: 'user',
        }
    }, {
        timestamps: true
    });
    return User;
};