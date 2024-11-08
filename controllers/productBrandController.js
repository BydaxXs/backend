const productBrandModel = require('../models/productBrandModel');

async function createProductBrand(req, res){
    try {
        const { productBrandName } = req.body;
        const createdProductBrand = new productBrandModel({
            productBrandName : productBrandName,
        });
        await createdProductBrand.save();
        res.status(200).send({msg : "Marca Creada correctamente"});
    } catch (error) {
        res.status(504).send({msg : 'Error al crear la marca'});
    }
}

async function getAllProductBrand(req, res){
    try {
        const allProductBrand = await productBrandModel.find();
        res.status(200).send(allProductBrand);
    } catch (error) {
        res.status(504).send('Error al buscar las marcas');
    }
}
module.exports = {
    createProductBrand,
    getAllProductBrand
}