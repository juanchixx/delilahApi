module.exports = (sequelize, DataTypes) =>{
    var Order_Item = sequelize.define('order_item', {
        id_orderitem: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
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