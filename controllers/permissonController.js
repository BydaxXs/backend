const permison = require('../models/permissonModel');
const validator = require('../utils/validator');
const log4 = require('log4js');
const logger = log4.getLogger('index.js');
logger.level = "all";

function createPermissons(req, res){
    const { code, namePermisson, postName } = req.body;
    // validator.validateCreatePermissons(req.body);
    const addPermisson = new permison({
        code: code,
        namePermisson: namePermisson,
        postName: postName
    });
    try {
        addPermisson.save();
        res.status(200).send({msg : "Permiso creado correctamente"});
    } catch (error) {
        logger.error(error.message);
    }   res.status(504).send({msg : "Error en la creacion del permiso"});
}

async function viewAllPermissons(req, res){
    try {
        const allPermissons = await permison.find();
        res.status(200).send(allPermissons);
    } catch (error) {
        res.status(400).send({msg : "Error en la busqueda"});
    }
}

async function deletePermisson(req, res){
    const { code } = req.body;
    try {
        await permison.deleteOne({code:code});
        res.status(200).send({msg : "Permiso eliminado correctamente"});
    } catch (error) {
        res.status(400).send({msg : "Error al eliminar el permiso"});
    }
}

async function editPermisson(req, res){
    const { id } = req.params;
    let body = req.body;
    try {
        await permison.updateOne({_id:id}, {
            $set : {
                code : body.code,
                namePermisson : body.namePermisson,
                postName : body.postName
            }
        });
        res.status(200).send({msg : "Permiso actualizado correctamente"});
    } catch (error) {
        res.status(400).send({msg : "Error al editar el permiso"});
    }
}

module.exports = {
    createPermissons,
    viewAllPermissons,
    deletePermisson,
    editPermisson
}