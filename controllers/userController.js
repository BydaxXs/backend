const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const costCenterModel = require('../models/costCenterModel');
const subDeptoModel = require('../models/subDeptoModel');
const processModel = require('../models/subDeptoProcessModel');
const viewModel = require('../models/viewsModel');
const permissonModel = require('../models/permissonModel');
const validator = require('../utils/validator');
const log4 = require('log4js');
const logger = log4.getLogger('userController.js');
logger.level = 'all';

async function resgisterUser(req, res){
    validator.validateRegister(req.body);
    const { firstname, secondname, lastname, secondSurname, email, username, role, permissonName,  password, costCenter, subDepto } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    const permissonFind = await permissonModel.findOne({namePermisson : permissonName});
    const newUser = new userModel({
        firstname : firstname,
        secondname : secondname,
        lastname : lastname,
        secondSurname : secondSurname,
        email : email.toLowerCase(),
        username : username.toLowerCase(),
        role : role,
        permisson : permissonFind,
        password : hashPassword,
        costCenter : costCenter,
        subDepto : subDepto,
        userMenu : []
    });
    try {
        await newUser.save();
        res.status(200).send(newUser);
    } catch (error) {
        logger.error(error.message);
        res.satus(500).send({msg: "Error al crear un nuevo usuario"});
    }
}
async function assingCostCenter(req, res){
    const { id, updatedCostCenterCode } = req.body;
    try {
        const costCenterFind = await costCenterModel.findOne({costCenterCode:updatedCostCenterCode});
        await userModel.updateOne({_id:id},{
            $set : {costCenter : {
                        costCenterCode : costCenterFind.costCenterCode,
                        costCenterName : costCenterFind.costCenterName,
                        costCenterNom : costCenterFind.costCenterNom
                    }
                }
        });
        res.status(200).send({msg : "Departamento asignado correctamente"});
    } catch (error) {
        res.status(400).send({msg : "Error al asignar el Departamento"});
    }
}
async function assingPermisson(req, res){
    const { id, permissonCode } = req.body;
    const permissonFind = await permissonModel.findOne({code:permissonCode});
    try {
        await userModel.updateOne({_id:id},{
            $set : {permisson : permissonFind}
        });
        res.status(200).send({msg : "Permiso asignado correctamente"});
    } catch (error) {
        res.status(400).send({msg : "Error al asignar un permiso"});
    }
}
async function setUserMenu(req, res){
    const { idUser, viewID } = req.body;
    try {
        const userFilter = { _id : idUser };
        let menuToPush = viewID;
        let updateMenu = {
            $push : {
                userMenu : { $each : menuToPush },
            },
        };
        await userModel.updateOne(userFilter, updateMenu);
        res.status(200).send({msg : "Menú Asignado Correctamente"});
    } catch (error) {
        logger.error(error);
        res.status(504).send({msg : "Error al Asignar el menú"});
    }
}
async function changeUserStatus(req, res){
    const { id } = req.body;
    const findedUser = await userModel.findById(id);
    const actualStatus = findedUser.active;
    try {
        if(actualStatus == true){
            var newUserStatus = !actualStatus;
            await userModel.findByIdAndUpdate(id, {$set : {active: newUserStatus}});
            res.status(200).send({msg : "Estado Cambiado a Inactivo"});
        }else if(actualStatus == false){
            var newUserStatus = !actualStatus;
            await userModel.findByIdAndUpdate(id, {$set : {active: newUserStatus}});
            res.status(200).send({msg : "Estado Cambiado a Activo"});
        }
    } catch (error) {
        res.status(400).send({msg: "Error al actualizar el estado del usuario"});
    }
}
async function getAllUsersWithoutDepto(req,res){
    try {
        const getAllUserWithoutDepto = await userModel.find({"costCenter.costCenterCode" : "00000"});
        res.status(200).send(getAllUserWithoutDepto);
    } catch (error) {
        res.status(504).send({msg : "Error en la busqueda de usuarios"});
    }
    
}
async function getInactiveUsers(req, res){
    try {
        const inactiveUsers = await userModel.find({active: false});
        res.status(200).send(inactiveUsers);
    } catch (error) {
        res.status(400).send({msg : "Error al obtener los usuarios desactivados"});
    }
}
async function getUsersByDpeto(req, res) {
    const { deptoId } = req.body;
    try {
        const users = await userModel.find({costCenter: deptoId}, '-email -username -role -active -password -costCenter -subDepto -userMenu -__v');
        res.status(200).send(users);
    } catch (error) {
        res.status(504).send({msg : 'Error al conseguir los usuarios'});
    }
}
module.exports = {
    resgisterUser,
    assingCostCenter,
    assingPermisson,
    changeUserStatus,
    setUserMenu,
    getAllUsersWithoutDepto,
    getInactiveUsers,
    getUsersByDpeto
}