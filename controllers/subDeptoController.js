const subDeptoModel = require('../models/subDeptoModel');

async function createAssignSubDepto(req, res){
    const { subDeptoName, costCenterLink } = req.body;
    const createdSubDepto = new subDeptoModel({
        subDeptoName: subDeptoName,
        costCenterLink: costCenterLink
    });
    await createdSubDepto.save();
    try {
        res.status(200).send({msg : "Subdepartamento creado y asignado correctamente"});
    } catch (error) {
        res.status(504).send({msg : "Error al crear el Subdepartamento"});
    }
}
async function viewAllSubDeptosOfDepto(req, res){
    const { costCenterLink } = req.body;
    const getSubDeptos = await subDeptoModel.find({costCenterLink: costCenterLink}, '-__v -costCenterLink');
    try {
        res.status(200).send(getSubDeptos);
    } catch (error) {
        res.status(504).send({msg : "Error al buscar los subdepartamentos"});
    }
}
module.exports = {
    createAssignSubDepto,
    viewAllSubDeptosOfDepto
}