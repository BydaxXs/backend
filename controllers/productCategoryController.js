const productCategoryModel = require('../models/productCategoryModel');

async function createProductCategory(req, res){
    try {
        const { productCategoryName } = req.body;
        const createdProductCategory = new productCategoryModel({
            productCategoryName : productCategoryName
        });
        await createdProductCategory.save();
        res.status(200).send({msg : "Categoria de productos creada correctamente"});   
    } catch (error) {
        res.status(504).send({msg : "Error al crear la categoria de productos"});
    }
}
async function getAllProductCategories(req, res){
    try {
        const allProductCategories = await productCategoryModel.find();
        res.status(200).send(allProductCategories);
    } catch (error) {
        res.status(504).send({msg : "Error al buscar las categorias de productos"});
    }
}
module.exports = {
    createProductCategory,
    getAllProductCategories
}