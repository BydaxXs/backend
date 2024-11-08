const actionModel = require('../models/actionModel');

async function createAction(req, res){
    const { actionName, processLink } = req.body;
    try {
        const createdAction = new actionModel({
            actionName : actionName,
            processLink : processLink
        });
        await createdAction.save();
        res.status(200).send({msg : "Accion creada correctamente"});
    } catch (error) {
        res.status(504).send({msg : "Error al crear la accion"})
    }
}
async function viewAllActions(req,res){
    try {
        const allActions = await actionModel.find();
        res.status(200).send(allActions);
    } catch (error) {
        res.status(504).send({msg : "Error al buscar las acciones"});
    }
}
async function getAllActionsByProcess(req, res) {
    const { processLink } = req.body;
    try {
        const actionByFunction = await actionModel.find({processLink : processLink});
        res.status(200).send(actionByFunction);
    } catch (error) {
        res.status(504).send({msg : "Error al obtener los datos de las acciones"});
    }
}
module.exports = {
    createAction,
    viewAllActions,
    getAllActionsByProcess
}