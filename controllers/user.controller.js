var {User} = require('../models/index')
var jwt = require('jsonwebtoken')

const firma = 'd3l1l4h';

exports.getUsers = async function (req, res) {
    try {
        var users = await User.findAll();        
        return res.status(200).json({ status: 200, data: users, message: "Usuarios recibidos correctaments" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.checkExistingMail = async function (req,res, next){
    const {email} = req.query;
    try {
        var users = await User.findAll({
            where: { email : email }
        });
        if(users.length > 0){
            res.status(403).json({error : 'El mail ya se encuentra registrado'});
            return;
        }else{
            next();
        }
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.createUser = async function (req, res) {
    const {username, name, email, telephone, address, password} = req.query;
    try {
        var user = await User.create({ 
            username: username,
            name: name,
            email: email,
            telephone: telephone,
            address: address,
            password: password,
            admin: 0});        
        return res.status(200).json({ status: 200, data: user, message: "Usuario creado correctamente" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.login = async function (req, res) {
    const {email: _email, password: _password} = req.query;         
    try {
        var users = await User.findAll({
            where: { email : _email }
        });
        if (users.length === 0){
            res.status(403).json({error : 'No existe ningún usuario registrado con ese email'});
            return;
        }
        usuario = users[0];
        if(usuario.password == _password){
            const token = jwt.sign({ 
                id: usuario.id_user, 
                admin: usuario.admin}
                , firma);
            res.status(200).json({status: 200, message: "Login correcto, pass: " + usuario.username, token: token})
        }else{
            res.status(403).json({error: 'Contraseña incorrecta'})
        }        
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.getUsa = function(){
    console.log('holu');
}

// module.exports =  async function InsertUsers(User){
//     const products = await User(sequelize, DataTypes).create([
//         { username: 'userSample' , name: 'Fake User', email: 'userfake@gmail.com', telephone: '011412412', address: 'Michigan 123', password: '12345' }         
//     ])    
//     console.log('Usuarios creados con éxito!');
// }