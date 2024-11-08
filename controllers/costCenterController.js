const costCenterModel = require('../models/costCenterModel');
const validator = require('../utils/validator');
const log4 = require('log4js');
const logger = log4.getLogger('index.js');
logger.level = "all";

function createCostCenter(req, res){
    const { costCenterCode, costCenterName, costCenterNom } = req.body;
    validator.validateCostCenter(req.body);
    const addCostCenter = new costCenterModel({
        costCenterCode : costCenterCode,
        costCenterName : costCenterName,
        costCenterNom : costCenterNom.toUpperCase()
    });
    try {
        addCostCenter.save();
        res.status(200).send(addCostCenter);
    } catch (error) {
        logger.error(error.message);
        res.status(504).send({msg : "Error al crear el Centro de costos"});
    }
}
async function getAllCostCenters(req, res){
    try {
        const allCostCenters = await costCenterModel.find();
        res.status(200).send(allCostCenters);
    } catch (error) {
        res.status(504).send({msg : "Error en la busqueda de los centros de costo"});
    }
}
async function deleteCostCenter(req, res){
    const { costCenterCode } = req.body;
    try {
        await costCenterModel.deleteOne({costCenterCode:costCenterCode});
        res.status(200).send({msg : "Centro de costo eliminado correctamente"});
    } catch (error) {
        res.status(400).send({msg : "Error al eliminar el centro de costos"});
    }
}
async function editCostCenter(req, res){
    const { id } = req.params;
    let body = req.body;
    try {
        await costCenterModel.updateOne({_id:id}, {
            $set : {
                costCenterCode: body.costCenterCode,
                costCenterName: body.costCenterName
            }
        });
        res.status(200).send({msg : "Centro de costo actualizado correctamente"});
    } catch (error) {
        res.status(400).send({msg : "Error al editar el centro de costo seleccionado"});
    }
}
async function getAllCostCentersExcepSuperAdmin(req, res){
    try {
        const allCostCenters = await costCenterModel.find({
            costCenterName: { $nin: ["Super Admin", "Sin Asignar"]}
        });
        res.status(200).send(allCostCenters);
    } catch (error) {
        res.status(504).send({msg : "Error en la busqueda de los centros de costo"});
    }
}
module.exports = {
    createCostCenter,
    getAllCostCenters,
    deleteCostCenter,
    editCostCenter,
    getAllCostCentersExcepSuperAdmin
}
