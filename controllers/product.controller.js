var {Product, Order_item} = require('../models/index')
var jwt = require('jsonwebtoken')

const firma = 'd3l1l4h';    

exports.createProduct = async function (req, res) {
    const {description, price, stock, favorite} = req.body;
    try {
        var product = await Product.create({ 
            description: description,
            price: price,
            stock: stock,
            favorite: favorite            
        });        
        return res.status(200).json({ status: 200, data: product, message: "Producto creado correctamente" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.getProducts = async function(req,res){
    try {
        var products = await Product.findAll();        
        return res.status(200).json({ status: 200, data: products, message: "Productos recibidos correctamente" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.getProduct = async function(req,res){
    try {
        const idProduct = parseInt(req.params.idProduct);

        var products = await Product.findAll({            
            where: {
                id_product: idProduct
              }
        });       
        if (products.length === 0){
            res.status(403).json({error : 'No existe el Producto solicitado.'});
            return;
        } 
        product = products[0];
        return res.status(200).json({ status: 200, data: product, message: "Producto recibida correctamente" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.updateProduct = async function(req,res){
    try {
        const idProduct = parseInt(req.params.idProduct);
        const {description, price, stock, favorite} = req.body;
        var products = await Product.findAll({
            where: {
                id_product: idProduct
              }
        });       
        if (products.length === 0){
            res.status(403).json({error : 'No existe el Producto solicitado.'});
            return;
        } 
        var updatedProduct = await Product.update({             
            description: description,
            price: price,
            stock: stock, 
            favorite: favorite
        },{
            where: {
                id_product: idProduct
            }
        });   
        return res.status(200).json({ status: 200, data: updatedProduct, message: "Producto actualizado" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.deleteProduct = async function(req,res){
    try {
        const idProduct = parseInt(req.params.idProduct);
        var orderItems = await Order_item.findAll({            
            where: {
                cod_product: idProduct
              }
        });     
        if(orderItems.length !== 0){
            res.status(403).json({error : 'No se puede borrar un producto se encuentra cargado en otras órdenes.'});
            return;
        }

        await Product.destroy({            
            where: {
                id_product: idProduct
              }
        });       
        
        return res.status(200).json({ status: 200, message: "Producto eliminado correctamente" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}