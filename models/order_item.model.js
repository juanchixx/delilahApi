var models = require('../models')

module.exports = (sequelize, DataTypes) =>{
    var Order_Item = sequelize.define('order_item', {
        id_orderitem: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        cod_order: {
            type: DataTypes.INTEGER,
            references: {
                model: models.user,
                key: 'id_order',
            }
        },
        cod_product: {
            type: DataTypes.INTEGER,
            references: {
                model: models.product,
                key: 'id_product',
            }
        },
        quantity: {
            type: DataTypes.INTEGER,  
        },
        price: {
            type: DataTypes.DECIMAL(10,2),      
        }
    }, {
        timestamps: false
    });

    return Order_Item;
}