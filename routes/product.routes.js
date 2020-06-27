var express = require('express');
var router = express.Router();

var ProductController = require('../controllers/product.controller')
var TokenController = require('../controllers/token.controller')

router.post('/product', TokenController.checkToken, TokenController.isAdmin, ProductController.createProduct);
router.get('/products', ProductController.getProducts);
router.get('/product/:idProduct', ProductController.getProduct);
router.put('/product/:idProduct', TokenController.checkToken, TokenController.isAdmin, ProductController.updateProduct);
router.delete('/product/:idProduct', TokenController.checkToken, TokenController.isAdmin, ProductController.deleteProduct);
module.exports = router;
