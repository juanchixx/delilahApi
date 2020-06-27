var express = require('express');
var router = express.Router();

var UserController = require('../controllers/user.controller')
var TokenController = require('../controllers/token.controller')

router.get('/usuarios', TokenController.checkToken, TokenController.isAdmin, UserController.getUsers);
router.post('/register', UserController.checkExistingMail, UserController.createUser);
router.post('/login', UserController.login);

module.exports = router;
