const addressModel = require('../models/addressModel');
const validator = require('../utils/validator');

async function createAddress(req, res){
    const { store, storeAddress } = req.body;
    validator.validateAddress(req.body);
    const findedId = await addressModel.find().sort({$natural:-1}).limit(1);
    const id = findedId[0].id + 1;
    const createdAddress = new addressModel({
        id: id,
        store: store,
        storeAddress: storeAddress
    });
    try {
        createdAddress.save();
        res.status(200).send({msg : "Tienda agregada correctamente"});
    } catch (error) {
        res.status(504).send({msg : "Error al agregar la tienda"});
    }
}
async function deleteAddress(req, res){
    const { id } = req.params;
    try {
        await addressModel.deleteOne({_id:id});
        res.status(200).send({msg : "Tienda borrada correctamente"});
    } catch (error) {
        res.status(504).send({msg : "Error al eliminar la tienda"});
    }
}
async function allStores(req, res){
    try {
        const getAllStores = await addressModel.find();
        res.status(200).send(getAllStores);
    } catch (error) {
        res.status(504).send({msg: "Error en la busqueda de las tiendas"});
    }
}
module.exports = {
    createAddress,
    deleteAddress,
    allStores
}