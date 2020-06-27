var {Order, Order_item, User, Status} = require('../models/index')

exports.createOrder = async function (req, res) {
    const { description, total_price, order_items } = req.body;    
    console.log(req.userToken);
    console.log(description, total_price, order_items);
    try {        
        var order = await Order.create({ 
            cod_user: req.userToken.id,
            cod_status: 1,
            date: new Date(),
            description: description,
            total_price: total_price
        }).then((data)=>{
            order_items.forEach((item) =>{
                    var item_order = Order_item.create({
                        cod_order : data.cod_order,
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
        var orders = await Order.findAll();        
        return res.status(200).json({ status: 200, data: orders, message: "Ordenes recibidas correctamente" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
exports.getOrder = async function(req,res){
    try {
        const idOrder = parseInt(req.params.idOrder);

        var orders = await Order.findAll({
            attributes: ['id_order', 'date', 'description','total_price'],
            where: {
                id_order: idOrder
              },
            include: [{
                model: User
            }, {
                model: Status
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
        var orders = await Order.findAll({
            where: {
                id_order: idOrder
              }
        });       
        if (orders.length === 0){
            res.status(403).json({error : 'No existe la orden solicitada.'});
            return;
        } 
        var updatedOrder = await Order.update({ 
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

        var orders = await Order.findAll({            
            where: {
                id_order: idOrder
              }
        });     
        if(orders.length === 0){
            res.status(403).json({error : 'No se encuentra la Orden que se quiere borrar.'});
            return;
        }
        await Order_item.destroy({            
            where: {
                cod_order: idOrder
              }
        });   
        await Order.destroy({            
            where: {
                id_order: idOrder
              }
        });              
        return res.status(200).json({ status: 200, message: "Orden eliminada correctamente" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}