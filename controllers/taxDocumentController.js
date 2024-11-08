const taxDocumentModel = require('../models/taxDocumentModel');
const providerModel = require('../models/providerModel');
const validator = require('../utils/validator');

async function createTaxDocument(req, res){
    const { docNumber, emissionDate, docType, supplier, applicant } = req.body;
    validator.validateCreateTaxDoc(req.body);
    let recivedItems = [];
    recivedItems = req.body.recivedItems;
    const findSupplier = await providerModel.findOne({providerName:supplier},'providerRUT providerName providerContact -_id');
    const createdTaxDoc = new taxDocumentModel({
        docNumber: docNumber,
        emissionDate: emissionDate,
        docType: docType,
        supplier: findSupplier,
        recivedItems: recivedItems,
        applicant: applicant
    });
    try {
        await createdTaxDoc.save();
        res.status(200).send({msg : "Documento de recepcion creado correctamente"});
    } catch (error) {
        res.status(504).send({msg : "Error en la creacion del documento"});
    }
}
async function deleteTaxDocument(req, res){
    const { id } = req.params;
    try {
        await taxDocumentModel.deleteOne({_id:id});
        res.status(200).send({msg : "Documento eliminado correctamente"});
    } catch (error) {
        res.status(504).send({msg : "Error al eliminar el documneto seleccionado"});
    }
}
async function allTaxDocuments(req, res){
    try {
        const getTaxDocuments = await taxDocumentModel.find();
        res.status(200).send(getTaxDocuments);
    } catch (error) {
        res.status(504).send({msg : "Error al buscar los documentos"});
    }
}
async function searchAny(req, res){
    const { body } = req.body;
    const searchTax = {
        $or:[
            { docNumber : body},
            { emissionDate : body},
            { docType : body},
            { applicant : {$regex: body, $options : "i"}}
        ],
    };
    await taxDocumentModel.find(searchTax)
    .then((result) => {
        res.status(200).send(result);
    })
    .catch((error) => {
        res.status(400).send(error);
    });
}
module.exports = {
    createTaxDocument,
    deleteTaxDocument,
    allTaxDocuments,
    searchAny
}