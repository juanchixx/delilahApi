var express = require('express');
var router = express.Router();


var OrderController = require('../controllers/order.controller')

router.post('/order', OrderController.createOrder);
router.get('/orders', OrderController.getOrders);
router.get('/order/:idOrder', OrderController.getOrder);
router.patch('/order/:idOrder', OrderController.updateOrder);
router.delete('/order/:idOrder', OrderController.deleteOrder);
module.exports = router;
