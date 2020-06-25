var models = require('../models')

module.exports = (sequelize, DataTypes) =>{
    var Order = sequelize.define('order', {
        id_order: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        cod_user: {
            type: DataTypes.INTEGER,
            references: {
                model: models.user,
                key: 'id_user',
            }
        },
        cod_status: {
            type: DataTypes.INTEGER,
            references: {
                model: models.status,
                key: 'id_status',
            }
        },
        date: {
            type: DataTypes.DATE,  
        },
        description: {
            type: DataTypes.STRING,
        },
        total_price: {
            type: DataTypes.DECIMAL(10,2),      
        }
    }, {
        timestamps: false
    });

    return Order;
}