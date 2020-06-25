module.exports = (sequelize, DataTypes) =>{
    var Product = sequelize.define('product', {
        id_product: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        description: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.DECIMAL(10,2),      
        },
        stock: {
            type: DataTypes.INTEGER,      
        },
        favorite: {
            type: DataTypes.BOOLEAN,      
        }
    }, {
        timestamps: false
    });

    return Product;
}