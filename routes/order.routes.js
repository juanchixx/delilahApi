var express = require('express');
var router = express.Router();


var OrderController = require('../controllers/order.controller')
var TokenController = require('../controllers/token.controller')

router.post('/order', TokenController.checkToken, OrderController.createOrder);
router.get('/orders', TokenController.checkToken, TokenController.isAdmin, OrderController.getOrders);
router.get('/order/:idOrder', OrderController.getOrder);
router.put('/order/:idOrder', TokenController.checkToken, TokenController.isAdmin, OrderController.updateOrder);
router.delete('/order/:idOrder', TokenController.checkToken, TokenController.isAdmin, OrderController.deleteOrder);
module.exports = router;
