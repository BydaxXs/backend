const requestModel = require('../models/requestModel');
const costCenterModel = require('../models/costCenterModel');
const userModel = require('../models/userModel');
const validator = require('../utils/validator');
const multer = require('multer');
const fs = require('fs').promises;
const os = require('os');
const path = require('path');
const log4 = require('log4js');
const logger = log4.getLogger('requestController.js');
logger.level = 'all'

async function createRequest(req, res){
    try {
        const { requestor, requestDate, requestVia, statusName, requestStatusDate, prevStatusName, prevRequestStatusDate, finalUserName, finalUserDepto, finalUserSubDepto, requestorID } = req.body;
        let previousRequestStatusPushed = [];
        let requestItems = [];
        requestItems = req.body.requestItems
        const requestStatus = {
            statusName : statusName,
            requestStatusDate : requestStatusDate
        };
        const previousRequestStatus = {
            prevStatusName : prevStatusName,
            prevRequestStatusDate :prevRequestStatusDate
        };
        previousRequestStatusPushed.push(previousRequestStatus);
        const finalUserDeptoCode = await costCenterModel.find({_id : finalUserDepto},'-_id -__v -costCenterNom -costCenterName');
        const finalUser = {
            finalUserName : finalUserName,
            finalUserDepto : finalUserDepto,
            finalUserDeptoCode : finalUserDeptoCode[0].costCenterCode,
            finalUserSubDepto : finalUserSubDepto
        };
        console.log();
        const lastDocument = await requestModel.find().sort({$natural : -1}).limit(1);
        let requestIdData = "";
        if(lastDocument == ""){
            requestIdData = 'APP000000000';
        }
        else{
            requestIdData = lastDocument[0].requestID.substring(3,12);
            requestIdData = parseInt(requestIdData, 10) + 1;
            requestIdData = 'APP' + requestIdData.toString().padStart(9,'0');
        }
        const createdRequest = new requestModel({
            requestor: requestor,
            requestItems : requestItems,
            requestDate: requestDate,
            requestVia : requestVia,
            requestStatus : requestStatus,
            previousRequestStatus : previousRequestStatusPushed,
            finalUser : finalUser,
            requestID : requestIdData,
            requestorID : requestorID
        });
        // RUTA PARA CREACION DE CARPETAS
        const folderRoute = path.join(__dirname,'../uploads', requestIdData);
        try {
            await fs.access(folderRoute, fs.constants.F_OK);
            console.log("La carpeta ya existe");
            logger.fatal("La carpeta ya existe");
        } catch (error) {
            if(error.code === 'ENOENT'){
                await fs.mkdir(folderRoute, { recursive : true });
                logger.info("Carpeta Creada correctamente");
            }else{
                logger.fatal('Error al verificar la carpeta');
            }
        }
        await createdRequest.save();
        res.status(200).send(createdRequest);
    }catch (error) {
        res.status(504).send({msg : "Error al crear la solicitud"});
        logger.fatal(error);
    }
}
async function updateRequestStatus(req, res){
    try {
        const { id, statusName, requestStatusDate } = req.body;
        const getRequestStatus = await requestModel.findOne({_id: id}, 'requestStatus -_id');
        const newRequestStatus = {
            statusName : statusName,
            requestStatusDate : requestStatusDate
        }
        const updateRequestStatus = {
            prevStatusName : getRequestStatus.requestStatus.statusName,
            prevRequestStatusDate : getRequestStatus.requestStatus.requestStatusDate
        }
        const updatedStatus = await requestModel.findByIdAndUpdate({_id : id}, { 
            $set : { requestStatus : newRequestStatus },
            $push : { previousRequestStatus : updateRequestStatus }
        }, { new : true });
        res.status(200).send(updatedStatus);
        logger.fatal(updateRequestStatus);
    } catch (error) {
        res.status(504).send({ msg : "Error al actualizar el estado de la solicitud"});
        logger.warn(error);
    }
}
function addQuotation(req, res, next){
    const requestID = req.params.requestID;
    try {
        req.requestID = requestID;
        logger.info("Solicitud seleccionada correctamente");
        next();
    } catch (error) {
        logger.error("Error al seleccionar una solicitud");
    }
}
async function copyFolder(req, res){
    const { folderID } = req.body;
    try {
        const userHome = os.homedir();
        const originFolder = path.join(__dirname,'../uploads',folderID);
        const files = await fs.readdir(originFolder);
        const finalFolder = path.join(userHome,'Desktop',folderID);
        if(files.length !== 0){
            //CREA LA CARPETA A DUPLICAR EN EL ESCRITORIO
            try {
                await fs.access(finalFolder, fs.constants.F_OK);
                logger.fatal("La carpeta ya existe");
            } catch (error) {
                if(error.code === 'ENOENT'){
                    await fs.mkdir(finalFolder, { recursive : true });
                    logger.info("Carpeta Creada correctamente");
                }else{
                    logger.fatal('Error al verificar la carpeta');
                }
            }
            //COPIA LOS ARCHIVOS DE LA CARPETA DE ORIGEN A LA CARPETA DESTINO
            for(let i = 0; i < files.length; i++){
                const fullOriginFolder = path.join(originFolder,files[i]);
                const fullDestinyFolder = path.join(finalFolder, files[i]);
                await fs.copyFile(fullOriginFolder, fullDestinyFolder);
            }
            res.status(200).send({msg : "Carpeta copiada en el escritorio"});
        }else{
            res.status(200).send({msg : "No hay archivos para copiar"});
        }
    } catch (error) {
        res.status(504).send({msg : "Error al procesar solicitud"});
    }
}
async function deleteRequest(req, res){
    const { id } = req.body;
    try {
        const deletedRequest = await requestModel.deleteOne({_id:id});
        res.status(200).send({msg : "Requerimiento eliminado correctamente"});
    } catch (error) {
        res.status(504).send({msg : "Error al eliminar el requerimiento"});
    }
}
async function getLastDocument(req, res){
    try {
        const lastDocument = await requestModel.find().sort({$natural : -1}).limit(1);
        res.status(200).send(lastDocument);
    } catch (error) {
        res.status(504).send({msg : "Error al buscar el ultimo documento"});
    }
}
//AGREGAR EL FILTRO DE QUE SEAN LAS NO COMPLETADAS
async function getRequest(req, res){
    try {
        const allRequests = await requestModel.find();
        res.status(200).send(allRequests);
    } catch (error) {
        res.status(504).send({msg : "Error al buscar las solicitudes"});
    }
}
async function getAllRequestData(req, res){
    try {
        let data = [];
        const requestData = await requestModel.find();
        for(let i = 0; i < requestData.length; i++ ){
            data.push({
                requestor: requestData[i].requestor,
                requestDate: requestData[i].requestDate,
                requestStatus : requestData[i].requestStatus,
                finalUserName : requestData[i].finalUser.finalUserName,
                requestID : requestData[i].requestID,
            });
        }
        res.status(200).send(data);
    } catch (error) {
        res.status(504).send({ msg : "Error al conseguir los datos" });
    }
}
async function getSpecificRequestData(req, res) {
    try {
        const { requestID } = req.body;
        let quotations;
        const specificRequest = await requestModel.find({ requestID : requestID });
        const finalUserDepto = await costCenterModel.find({ _id :  specificRequest[0].finalUser.finalUserDepto.toString() }, '-__v -_id');
        try {
            quotations = await fs.readdir(`./uploads/${requestID}`);
            logger.info("Archivos Encontrados");
        } catch (error) {
            logger.error('Error al cargar el directorio ', error);
        }
        console.log(quotations);
        let dataRequest = {
            id : specificRequest[0]._id,
            requestor: specificRequest[0].requestor,
            requestItems: specificRequest[0].requestItems,
            requestDate: specificRequest[0].requestDate,
            requestVia : specificRequest[0].requestVia,
            requestStatus : specificRequest[0].requestStatus,
            previousRequestStatus : specificRequest[0].previousRequestStatus,
            finalUser : {
                finalUserName : specificRequest[0].finalUser.finalUserName,
                finalUserDepto : finalUserDepto[0].costCenterName
            },
            requestID : specificRequest[0].requestID,
            requestorID : specificRequest[0].requestorID,
            quotations : quotations
        }
        res.status(200).send(dataRequest);
    } catch (error) {
        res.status(504).send({ msg : "Error al conseguir los datos de la solicitud"});
    }
}
//AGREGAR EL FILTRO DE QUE SEAN LAS NO COMPLETADAS
async function getOwnRequests(req, res){
    try {
        const { requestorID } = req.body;
        let ownData = [];
        const ownRequestData = await requestModel.find({ requestorID : requestorID });
        for(let i = 0; i < ownRequestData.length; i++ ){
            ownData.push({
                requestor: ownRequestData[i].requestor,
                requestDate: ownRequestData[i].requestDate,
                requestStatus : ownRequestData[i].requestStatus,
                finalUserName : ownRequestData[i].finalUser.finalUserName,
                requestID : ownRequestData[i].requestID
            });
        }
        res.status(200).send(ownData);
    } catch (error) {
        res.status(504).send({ msg : "Error al conseguir los datos de las solicitudes"});
    }
}
//AGREGAR EL FILTRO DE QUE SEAN LAS NO COMPLETADAS
async function getRequestByDepto(req, res) {
    try {
        const { deptoID } = req.body;
        let deptoRequest = [];
        const deptoRequestData = await requestModel.find({'finalUser.finalUserDepto' : deptoID});
        for(let i = 0; i < deptoRequestData.length; i++){
            deptoRequest.push({
                requestor: deptoRequestData[i].requestor,
                requestDate: deptoRequestData[i].requestDate,
                requestStatus : deptoRequestData[i].requestStatus,
                finalUserName : deptoRequestData[i].finalUser.finalUserName,
                requestID : deptoRequestData[i].requestID
            });
        }
        res.status(200).send(deptoRequest);
    } catch (error) {
        res.status(504).send({msg : "Error al conseguir los datos"})
    }
}
//AGREGAR EL FILTRO DE QUE SEAN LAS NO COMPLETADAS
async function getRequestBySubdepto(req, res) {
    try {
        const { subdeptoID } = req.body;
        let subdeptoRequest = [];
        const subdeptoRequestData = await requestModel.find({'finalUser.finalUserSubDepto' : subdeptoID});
        for(let i = 0; i < subdeptoRequestData.length; i++){
            subdeptoRequest.push({
                requestor: subdeptoRequestData[i].requestor,
                requestDate: subdeptoRequestData[i].requestDate,
                requestStatus : subdeptoRequestData[i].requestStatus,
                finalUserName : subdeptoRequestData[i].finalUser.finalUserName,
                requestID : subdeptoRequestData[i].requestID
            });
        }
        res.status(200).send(subdeptoRequest);
    } catch (error) {
        res.status(504).send({msg : "Error al conseguir los datos"})
    }
}

module.exports = {
    createRequest,
    updateRequestStatus,
    deleteRequest,
    getLastDocument,
    getRequest,
    addQuotation,
    getAllRequestData,
    getSpecificRequestData,
    getOwnRequests,
    getRequestByDepto,
    getRequestBySubdepto,
    copyFolder
}