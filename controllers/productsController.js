const log4 = require('log4js');
const logger = log4.getLogger('productsController');
const productModel = require('../models/productsModel');
const providerModel = require('../models/providerModel');
const productBrandModel = require('../models/productBrandModel');
const productCategories = require('../models/productCategoryModel');
const productValidator = require('../utils/productValidator');

async function registerProduct(req, res){
    const { model, description, productBrandLink, productCategoryLink } = req.body;
    // productValidator.validateCreateProduct(req.body);
    const registedProduct = new productModel({
        model : model,
        description : description,
        productBrandLink : productBrandLink,
        productCategoryLink : productCategoryLink
    });
    try {
        await registedProduct.save();
        res.status(200).send({msg : "Producto registrado correctamente"});
    } catch (error) {
        res.status(504).send({msg : "Error al registrar el producto"});
    }
}

async function setProductToProvider(req, res){
    const { providerID, productID, providerProductPrice, productBrandLink, productCategoryLink } = req.body;
    try {
        const filter = { _id : providerID };
        let productPriceProvider = {
            productLink : productID,
            productPrice : providerProductPrice,
            productBrandLink : productBrandLink
        }
        let setProducts = {
            $push : {
                providerProductInfo : productPriceProvider
            }
        }
        await providerModel.updateOne(filter, setProducts);
        res.status(200).send({msg : "Producto asignado correctamente"});
    } catch (error) {
        res.status(504).send({msg : "Error al asignar producto"});
        logger.fatal(error);
    }
}

async function getAllProductData(req, res){
    try {
        let data = [];
        const productData = await productModel.find();
        for(let i = 0; i < productData.length; i++){
            const productBrandLinkData = await productBrandModel.find({ _id : productData[i].productBrandLink.toString()},'-__v -_id');
            const productCategoryLinkData = await productCategories.find({ _id : productData[i].productCategoryLink.toString()},'-__v -_id');
            data.push({
                model : productData[i].model,
                description : productData[i].description,
                productBrandLink : productBrandLinkData[0].productBrandName,
                productCategoryLink : productCategoryLinkData[0].productCategoryName
            });
        };
        res.status(200).send(data);
    } catch (error) {
        res.status(504).send({msg : "Error al cargar lo datos"});
        logger.fatal(error);
    };
}
async function brandFilterProduct(req, res){
    const { brandFilter } = req.body;
    try {
        let data = [];
        const productData = await productModel.find({ productBrandLink: brandFilter });
        for(let i = 0; i < productData.length; i++){
            const productBrandLinkData = await productBrandModel.find({ _id : productData[i].productBrandLink.toString()},'-__v -_id');
            const productCategoryLinkData = await productCategories.find({ _id : productData[i].productCategoryLink.toString()},'-__v -_id');
            data.push({
                _id : productData[i]._id,
                model : productData[i].model,
                description : productData[i].description,
                productBrandLink : productBrandLinkData[0].productBrandName,
                productCategoryLink : productCategoryLinkData[0].productCategoryName
            });
        };
        res.status(200).send(data);
    } catch (error) {
        res.status(504).send({msg : "Error al cargar lo datos"});
        logger.fatal(error);
    };
}
async function categoryFilterProduct(req, res){
    const { categoryFilter } = req.body;
    try {
        let data = [];
        const productData = await productModel.find({ productCategoryLink: categoryFilter });
        for(let i = 0; i < productData.length; i++){
            const productBrandLinkData = await productBrandModel.find({ _id : productData[i].productBrandLink.toString()},'-__v -_id');
            const productCategoryLinkData = await productCategories.find({ _id : productData[i].productCategoryLink.toString()},'-__v -_id');
            data.push({
                _id : productData[i]._id,
                model : productData[i].model,
                description : productData[i].description,
                productBrandLink : productBrandLinkData[0].productBrandName,
                productCategoryLink : productCategoryLinkData[0].productCategoryName
            });
        };
        res.status(200).send(data);
    } catch (error) {
        res.status(504).send({msg : "Error al cargar lo datos"});
        logger.fatal(error);
    };
}

module.exports = {
    registerProduct,
    setProductToProvider,
    getAllProductData,
    brandFilterProduct,
    categoryFilterProduct
}