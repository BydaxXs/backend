const itemTypeModel = require('../models/itemTypeModel');
const validateItemType = require('../utils/itemTypeValidator');

async function createItemType(req, res){
    const { itemCategoryName } = req.body;
    validateItemType.validateCreateItemType(req.body);
    const createdItemType = new itemTypeModel({
        itemCategoryName: itemCategoryName
    });
    try {
        await createdItemType.save();
        res.status(200).send({msg : "Categoria de producto creada correctamente"});
    } catch (error) {
        res.status(504).send({msg : "Error al crear la categoria de producto"});
    }
}
async function allItemType(req, res){
    try {
        const getAllItemsType = await itemTypeModel.find();
        res.status(200).send(getAllItemsType)
    } catch (error) {
        res.status(504).send({msg : "Erro al buscar las categorias"});
    }
}
module.exports = {
    createItemType,
    allItemType
}