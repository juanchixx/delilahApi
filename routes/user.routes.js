var express = require('express');
var router = express.Router();

var UserController = require('../controllers/user.controller')
var TokenController = require('../controllers/token.controller')
router.get('/users', TokenController.checkToken, TokenController.isAdmin, UserController.getUsers);
router.post('/register', UserController.checkExistingMail, UserController.register);
router.post('/login', UserController.login);

module.exports = router;
