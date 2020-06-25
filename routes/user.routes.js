var express = require('express');
var router = express.Router();

var UserController = require('../controllers/user.controller')

router.get('/usuarios', UserController.getUsers);
router.post('/register', UserController.checkExistingMail, UserController.createUser);
router.post('/login', UserController.login);

module.exports = router;
