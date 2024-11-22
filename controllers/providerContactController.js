const providerContactModel = require('../models/providerContactModel');
const validateProviderContact = require('../utils/providerContactValidator');
const log4 = require('log4js');
const logger = log4.getLogger('providerContactController');
logger.level = 'all';

async function createContact(req, res){
    const { providerContactName, providerContactEmail, providerContactNumber, providerId } = req.body;
    // validateProviderContact.validateCreateProviderContact(req.body);
    const createProviderContact = new providerContactModel({
        providerContactName: providerContactName,
        providerContactEmail: providerContactEmail,
        providerContactNumber: providerContactNumber,
        provider: providerId
    });
    try {
        await createProviderContact.save();
        res.status(200).send({msg : "Contacto creado correctamente"});
    } catch (error) {
        res.status(504).send({msg : "Error en la creacion del contacto"});
        logger.info(error);
    }
}
async function setContact(req, res){
    const { contactId, providerContactEmail, providerContactNumber, provider } = req.body;
    validateProviderContact.validateSetContact(req.body);
    await providerContactModel.findOneAndUpdate({_id:contactId},{
        providerContactEmail: providerContactEmail,
        providerContactNumber: providerContactNumber,
        assignat: true,
        provider: provider
    });
    //ELIMINAR SET CONTACT?
    try {
        res.status(200).send({msg : "Contacto Asignado Correctamente"});
    } catch (error) {
        res.status(504).send({msg : "Error al Asignar Contacto"});
    }
}
async function unAssignContact(req, res){
    const { contactId } = req.body;
    validateProviderContact.validateunAssignContact(req.body);
    await providerContactModel.findOneAndUpdate({_id:contactId},{
        providerContactEmail: null,
        providerContactNumber: null,
        assignat: false,
        provider: null
    });
    try {
        res.status(200).send({msg : "Contacto Desasignado correctamente"});
    } catch (error) {
        res.status(504).send({msg : "Error al Desasignar Contacto"});
    }
}
async function viewAllUnassignedContacts(req, res){
    const allUnassignedProviderContacts = await providerContactModel.find({assignat:false});
    try {
        res.status(200).send(allUnassignedProviderContacts);
    } catch (error) {
        res.status(504).send({msg : "Error al buscar los contactos activos"});
    }
}
module.exports = {
    createContact,
    unAssignContact,
    setContact,
    viewAllUnassignedContacts
}