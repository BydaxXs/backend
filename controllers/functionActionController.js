const functionActionModel = require('../models/functionActionModel');

async function createFunctionAction(req, res){
    const { actionName, actionURI } = req.body;
    const createdFunctionAction = new functionActionModel({
        actionName: actionName,
        actionURI: actionURI
    });
    await createdFunctionAction.save();
    try {
        res.status(200).send({msg: "Accion creada Correctamente"});
    } catch (error) {
        res.status(504).send({msg: "Error en la creacion de la accion"});
    }
}
module.exports = {
    createFunctionAction
}