const viewCategoryModel = require('../models/viewCategoryModel');
const log4js = require('log4js');
const logger = log4js.getLogger('viewCategoryController')

async function createViewCategory(req, res){
    const { viewCategoryName } = req.body;
    const createdViewCategory = new viewCategoryModel({
        viewCategoryName: viewCategoryName
    });
    try {
        await createdViewCategory.save();
        res.status(200).send({msg : "Categoria de vista creada correctamente"});
    } catch (error) {
        res.status(504).send({msg : "Error al crear la categoria de la vista"});
    }
}
async function viewAllCategories(req, res){
    try {
        const allCategories = await viewCategoryModel.find();
        res.status(200).send(allCategories);
    } catch (error) {
        res.status(504).send({msg : "Error en la busqueda"});
    }
}

module.exports = {
    createViewCategory,
    viewAllCategories
}