const deliveryModel = require('../models/deliveryModel');
const addressModel = require('../models/addressModel');
const validator = require('../utils/validator');

async function createDeliveryOrder(req, res){
    validator.validateDelivery(req.body);
    const { orderNumber, senderName, senderStore, reciverName, reciverStore, sendItems, sendDate } = req.body;
    const sendedAddress = await addressModel.findOne({store:senderStore});
    const recivedAddress = await addressModel.findOne({store:reciverStore});
    let sendedItems = [];
    sendedItems = sendItems;
    const createdDeliveryOrder = new deliveryModel({
        orderNumber:orderNumber,
        senderName:senderName,
        senderAddress:sendedAddress,
        reciverName:reciverName,
        reciverAddress:recivedAddress,
        sendItems:sendedItems,
        sendDate:sendDate
    });
    try {
        createdDeliveryOrder.save();
        res.status(200).send({msg : `Orden de despacho ${orderNumber} creada correctamente`});
    } catch (error) {
        res.status(504).send({msg : "Error al crear la orden de despacho"});
    }
}
async function viewAllDeliveryOrders(req, res){
    try {
        const allDelivery = await deliveryModel.find();
        res.status(200).send(allDelivery);
    } catch (error) {
        res.status(504).send({msg : "Erro al buscar las ordenes de despacho"});
    }
}
async function searchAnyOrder(req, res){
    const { body } = req.body;
    const searchQuery = {
        $or:[
            { orderNumber : body },
            { senderName : {$regex: body, $options : "i"}},
            { reciverName : {$regex: body, $options : "i"}},
            { reciverAddress : {$regex: body, $options : "i"}},
            { sendDate : body },           
        ],
    };
    await deliveryModel.find(searchQuery)
    .then((result) => {
        res.status(200).send(result);
    }).catch((error) => {
        res.status(400).send(error);
    });
}
module.exports = {
    createDeliveryOrder,
    viewAllDeliveryOrders,
    searchAnyOrder
}