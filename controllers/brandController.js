const brandModel = require('../models/brandModel');
const brandValidator = require('../utils/brandValidator');

async function createBrand(req, res){
    const { brandName } = req.body;
    brandValidator.validateCreateBrand(req.body);
    const createdBrand = new brandModel({
        brandName:brandName
    });
    await createdBrand.save();
    try {
        res.status(200).send({msg : "Marca Creada Correctamente"});
    } catch (error) {
        res.status(504).send({msg : "Error al crear la marca"});
    }
}
async function allBrands(req, res){
    try {
        const brands = await brandModel.find();
        res.status(200).send(brands);
    } catch (error) {
        res.status(504).send({msg : "Error en la busqueda de marcas"});
    }
}
module.exports = {
    createBrand,
    allBrands
}