var express = require('express');
var router = express.Router();

var ProductController = require('../controllers/product.controller')

router.post('/product', ProductController.createProduct);
router.get('/products', ProductController.getProducts);
router.get('/product/:idProduct', ProductController.getProduct);
router.patch('/product/:idProduct', ProductController.updateProduct);
router.delete('/product/:idProduct', ProductController.deleteProduct);
module.exports = router;
