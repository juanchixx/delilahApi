var models = require('../models')
var jwt = require('jsonwebtoken')
const bodyParser = require('body-parser');

const firma = 'd3l1l4h';    

//#region Relaciones

// Relación Order => Status
models.order.belongsTo(models.status, {
    foreignKey: 'cod_status'    
  });
models.status.hasMany(models.order, {
    foreignKey: 'cod_status',    
});

// Relación Order => User
models.order.belongsTo(models.user, {
    foreignKey: 'cod_user'    
  });
models.user.hasMany(models.order, {
    foreignKey: 'cod_user'
});

// Relación Order => Order_item <= Product
models.product.belongsToMany(models.order, {
    through: models.order_item, 
    foreignKey: 'id_product',
    otherKey: 'id_order'
  });
models.order.belongsToMany(models.product, {
    through: models.order_item, 
    foreignKey: 'id_order',
    otherKey: 'id_product'
  });

//#endregion

exports.createOrder = async function (req, res) {
    const {cod_user, description, total_price, order_items} = req.body;    
    try {        
        var order = await models.order.create({ 
            cod_user: cod_user,
            cod_status: 1,
            date: new Date(),
            description: description,
            total_price: total_price
        }).then((data)=>{
            order_items.forEach((item) =>{
                    var item_order = models.order_item.create({
                        cod_order : data.id_order,
                        cod_product: item.cod_product,
                        quantity: item.quantity,
                        price: item.price
                    })
                })              
                return res.status(200).json({ status: "200", data: data, message: "Orden creada correctamente" });
        });      
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
exports.getOrders = async function(req,res){
    try {
        var orders = await models.order.findAll();        
        return res.status(200).json({ status: 200, data: orders, message: "Ordenes recibidas correctamente" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
exports.getOrder = async function(req,res){
    try {
        const idOrder = parseInt(req.params.idOrder);

        var orders = await models.order.findAll({
            attributes: ['id_order', 'date', 'description','total_price'],
            where: {
                id_order: idOrder
              },
            include: [{
                model: models.user
            }, {
                model: models.status
            }]
        });       
        if (orders.length === 0){
            res.status(403).json({error : 'No existe la orden solicitada.'});
            return;
        } 
        order = orders[0];
        return res.status(200).json({ status: 200, data: order, message: "Orden recibida correctamente" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
exports.updateOrder = async function(req,res){
    try {
        const idOrder = parseInt(req.params.idOrder);
        const {description, cod_status, total_price} = req.body;
        var orders = await models.order.findAll({
            where: {
                id_order: idOrder
              }
        });       
        if (orders.length === 0){
            res.status(403).json({error : 'No existe la orden solicitada.'});
            return;
        } 
        var updatedOrder = await models.order.update({ 
            cod_status: cod_status,
            description: description,
            total_price: total_price
        },{
            where: {
                id_order: idOrder
            }
        });   
        return res.status(200).json({ status: 200, data: updatedOrder, message: "Orden actualizada" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
exports.deleteOrder = async function(req,res){
    try {
        const idOrder = parseInt(req.params.idOrder);

        var orders = await models.order.findAll({            
            where: {
                id_order: idOrder
              }
        });     
        if(orders.length === 0){
            res.status(403).json({error : 'No se encuentra la Orden que se quiere borrar.'});
            return;
        }
        await models.order_item.destroy({            
            where: {
                cod_order: idOrder
              }
        });   
        await models.order.destroy({            
            where: {
                id_order: idOrder
              }
        });              
        return res.status(200).json({ status: 200, message: "Orden eliminada correctamente" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}