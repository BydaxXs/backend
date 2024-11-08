const viewsModel = require('../models/viewsModel');
const log4 = require('log4js');
const logger = log4.getLogger('viewsController.js');

async function createViewData(req, res){
    const { viewName, apiPath, frontPath, viewPermisson, actionLink } = req.body;
    const createdViewData = new viewsModel({
        viewName : viewName,
        apiPath : apiPath, 
        frontPath : frontPath,
        viewPermisson:viewPermisson,
        actionLink : actionLink
    });
    try {
        await createdViewData.save();
        res.status(200).send({msg : "Datos de vista creados correctamente"});
    } catch (error) {
        logger.error(error);
        res.status(504).send({msg : "Error al crear datos de vista"});
    }
}

async function deleteViewData(req, res){
    const { viewCode } = req.body;
    try {
        await viewsModel.deleteOne({_id:viewCode});
        res.status(200).send({msg : "Datos de vista eliminados correctamente"});
    } catch (error) {
        res.status(504).send({msg : "Error al eliminar los datos de la vista"});
    }
}

async function getAllDataViews(req, res){
    try {
        const allDataViews = await viewsModel.find();
        res.status(200).send({allDataViews});
    } catch (error) {
        res.status(504).send({msg : "Error en la busqueda de datos"});
    }
}

module.exports = {
    createViewData,
    deleteViewData,
    getAllDataViews,
}