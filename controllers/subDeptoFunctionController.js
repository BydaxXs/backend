const subDeptoFunctionModel = require('../models/subDeptoProcessModel');

async function createSubDeptoFunction(req, res){
    const { subDeptoFunctionName, subDeptoLink } = req.body;
    const createSubDeptoFunction = new subDeptoFunctionModel({
        subDeptoFunctionName: subDeptoFunctionName,
        subDeptoLink: subDeptoLink
    });
    await createSubDeptoFunction.save();
    try {
        res.status(200).send({msg : "Funcion de Subdepatamento creada y asignada correctamente"});
    } catch (error) {
        res.status(504).send({msg : "Error al crear la funcion del Subdepartamento"});
    }
}
async function viewAllFunctionsOfSubDepto(req, res){
    const { subDeptoLink } = req.body;
    const getSubDeptoFunction = await subDeptoFunctionModel.find({subDeptoLink:subDeptoLink},'-__v -subDeptoLink');
    try {
        res.status(200).send(getSubDeptoFunction)
    } catch (error) {
        res.status(504).send({msg : "Error en la busqueda de las funciones del subdepartamento"})
    }
}
module.exports = {
    createSubDeptoFunction,
    viewAllFunctionsOfSubDepto
}