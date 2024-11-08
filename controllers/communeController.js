const communeModel = require('../models/communeModel');
const communeValidator = require('../utils/communeValidator');

async function createCommune(req, res){
    const { communeName, postalCode, country } = req.body;
    communeValidator.validateCommuneRegister(req.body);
    const createdCommune = new communeModel({
        communeName: communeName,
        postalCode: postalCode,
        country: country
    });
    await createdCommune.save();
    try {
        res.status(200).send({msg : "Comuna creada correctamente"});
    } catch (error) {
        res.status(504).send({msg : "Error al Registrar la Comuna"});
    }
}
async function allCommunesOfCountry(req, res){
    const { countryName } = req.body;
    communeValidator.validateAllCommuneConuntry(req.body);
    try {
        const communesOfCountry = await communeModel.find({})
        .populate({
            path : 'country',
            match : {countryName : countryName}
        });
        res.status(200).send(communesOfCountry);
    } catch (error) {
        res.status(200).send({msg : "Error en la Busqueda de las Comunas"});
    }
}
async function deleteCommune(req, res){
    communeValidator.validateCommuneDelete(req.body);
    const { idCommune } = req.body;
    try {
        await communeModel.deleteOne({_id:idCommune});
        res.status(200).send({msg : "Comuna Eliminada Correctamente"});
    } catch (error) {
        res.status(504).send({msg : "Error al Eliminar Comuna"});
    }
}
module.exports = {
    createCommune,
    allCommunesOfCountry,
    deleteCommune
} 