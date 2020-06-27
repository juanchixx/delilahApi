'use strict';

const Sequelize = require('sequelize');

const product = require('./product.model');
const status = require('./status.model');
const user = require('./user.model');
const order = require('./order.model');
const order_item = require('./order_item.model');

const sequelize = new Sequelize(
  '3dX3nIomM4',
  '3dX3nIomM4',
  'PCc0zz0SVe',
{
  host: 'remotemysql.com',
  dialect: 'mysql'
});

const Product = product(sequelize, Sequelize.DataTypes);
const Status = status(sequelize, Sequelize.DataTypes);
const User = user(sequelize, Sequelize.DataTypes);
const Order = order(sequelize, Sequelize.DataTypes);
const Order_item = order_item(sequelize, Sequelize.DataTypes);

//#region Relaciones

// Relación Order => Status
Order.belongsTo(Status, {
  foreignKey: 'cod_status'    
});
Status.hasMany(Order, {
  foreignKey: 'cod_status',    
});

// Relación Order => User
Order.belongsTo(User, {
  foreignKey: 'cod_user'    
});
User.hasMany(Order, {
  foreignKey: 'cod_user'
});

// Relación Order => Order_item <= Product
Product.belongsToMany(Order, {
  through: Order_item, 
  foreignKey: 'id_product',
  otherKey: 'id_order'
});
Order.belongsToMany(Product, {
  through: Order_item, 
  foreignKey: 'id_order',
  otherKey: 'id_product'
});

//#endregion

sequelize.sync({ force: false})
.then(() => {
    console.log('Synchronized tables')
});

module.exports = {
  Product,
  Status,
  User,
  Order,
  Order_item
}