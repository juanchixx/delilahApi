module.exports = (sequelize, DataTypes) =>{
    var Order = sequelize.define('order', {
        id_order: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
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