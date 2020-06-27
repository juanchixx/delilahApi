const express = require('express');
const bodyParser = require('body-parser');

var usersRoute = require('./routes/user.routes');
var ordersRoute = require('./routes/order.routes');
var productsRoute = require('./routes/product.routes');
const server = express();
server.use(bodyParser.json());

server.use('/', usersRoute);
server.use('/', ordersRoute);
server.use('/', productsRoute);

server.listen(3000,()=>{
    console.log('Delilah API iniciada...');  
})

async function InsertProductos(){
    const products = await Model.Product(sequelize, DataTypes).bulkCreate([
        { description: 'Bagel de salmón', price: 425, stock: 10, favorite: 0 } ,
        { description: 'Hamburguesa clásica', price: 350, stock: 10, favorite: 0 } ,
        { description: 'Sandwich veggie', price: 310, stock: 10, favorite: 0 } ,
        { description: 'Ensalada veggie', price: 340, stock: 10, favorite: 0 } ,
        { description: 'Focaccia', price: 440, stock: 10, favorite: 1 } ,
        { description: 'Sandwich Focaccia', price: 440, stock: 10, favorite: 0 } ,        
        { description: 'Veggie avocado', price: 310, stock: 10, favorite: 1 } 
    ])    
    console.log('productos creados con éxito!');
}

async function InsertStatus(){
    const status = await Model.Status(sequelize, DataTypes).bulkCreate([
        { description: 'Confirmado' } ,
        { description: 'En Preparación' } ,
        { description: 'En Camino' } ,
        { description: 'Entregado' } ,
    ])    
    console.log('Estados creados con éxito!');
}

async function InsertOrder(){
    const products = await Order(sequelize, DataTypes).bulkCreate([
        { cod_status: 1 , cod_username: 1, date: '10/01/2004', description: 'primer pedido', total_price: 10.40 } ,                
    ])    
    console.log('Orden creada con éxito!');
}

async function InsertOrderItem(){
    const products = await OrderItem(sequelize, DataTypes).bulkCreate([
        { cod_order: 1 , cod_product: 4, quantity: 5, price: 10.40 } ,                
    ])    
    console.log('Item de orden #1 creada con éxito!');
}