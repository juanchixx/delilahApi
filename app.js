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
