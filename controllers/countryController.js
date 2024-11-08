const countryModel = require('../models/countryModel');
const countryValidator = require('../utils/countryValidator');

async function createCountry(req, res){
    const { countryName } = req.body;
    countryValidator.validateCountry(req.body);
    const createdCountry = new countryModel({
        countryName: countryName
    });
    try {
        await createdCountry.save();
        res.status(200).send({msg : "Pais Agregado correctamente"});
    } catch (error) {
        res.status(504).send({msg : "Error al Registrar el Pais"});
    }
}
async function deleteCountry(req, res){
    const { id } = req.body;
    countryValidator.validateCountry(req.body);
    try {
        await countryModel.deleteOne({_id:id});
        res.status(200).send({msg : "Pais Eliminado Correctamente"});
    } catch (error) {
        res.status(504).send({msg : "Error al Eliminar el Pais"});
    }
}
async function allCountries(req, res){
    try {
        const getAllCountries = await countryModel.find();
        res.status(200).send(getAllCountries);
    } catch (error) {
        res.status(504).send({msg : "Error en la Busqueda"});
    }
}
module.exports = {
    createCountry,
    deleteCountry,
    allCountries
}