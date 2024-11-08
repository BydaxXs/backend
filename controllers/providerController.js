const providerModel = require('../models/providerModel');
const productModel = require('../models/productsModel');
const productBrandModel = require('../models/productBrandModel');
const productCategories = require('../models/productCategoryModel');
const validateProvider = require('../utils/providerValidator');
const log4 = require('log4js');
const logger = log4.getLogger('providerController.js');
logger.level = 'all';

async function createProvider(req, res){
    const { providerRUT, providerRegisteredName, providerFantasyName, market, address, countryCommune } = req.body;
    // validateProvider.validateCreateProvider(req.body)
    const addProvider = new providerModel({
        providerRUT : providerRUT,
        providerRegisteredName : providerRegisteredName,
        providerFantasyName : providerFantasyName,
        market: market,
        address: address,
        countryCommune: countryCommune,
        providerProductInfo : []

    });
    await addProvider.save();
    try {
        res.status(200).send({msg : "Proveedor creado correctamente"});
    } catch (error) {
        res.status(504).send({msg : "Error al crear un proveedor"});
    }
}
async function viewAllProviders(req, res){
    try {
        const getProviders = await providerModel.find();
        res.status(200).send(getProviders);
    } catch (error) {
        res.status(400).send({msg : "Error en la busqueda"});
    }
}
async function assingProductProvider(req, res){
    const { providerID, productID } = req.body;
    try {
        const providertFilter = { _id : providerID };
        let productsToPush = productID;
        let updateProviderProducts = {
            $push : {
                providerProductInfo : productsToPush
            },
        };
        await providerModel.updateOne(providertFilter, updateProviderProducts);
        res.status(200).send({msg : "Producto Añadido al Proveedor Correctamente"});
    } catch (error) {
        res.status(504).send({msg : "Error al Añadir Producto al Proveedor"});
        logger.fatal(error)
    }
}
async function getProductDataFromProvider(req, res){
    const { providerID } = req.body;
    try {
        let productsData = [];
        const productsProvider = await providerModel.find({ _id : providerID },'-_id -providerRUT -providerRegisteredName -providerFantasyName -market -address -countryCommune');
        for(i = 0; i <= productsProvider.length; i++){
            const productData = await productModel.find({ _id : productsProvider[0].providerProductInfo[i] }, '-description -__v');
            const productBrandLinkData = await productBrandModel.find({ _id : productData[0].productBrandLink },'-__v -_id');
            const productCategoryLinkData = await productCategories.find({ _id : productData[0].productCategoryLink },'-__v -_id');
            productsData.push({
                model : productData[0].model,
                productBrandLink : productBrandLinkData[0].productBrandName,
                productCategoryLink : productCategoryLinkData[0].productCategoryName
            });
        }
        res.status(200).send(productsData);
    } catch (error) {
        logger.fatal(error);
        res.status(504).send({msg : "Error al cargar los datos"});
    }
}
module.exports = {
    createProvider,
    viewAllProviders,
    assingProductProvider,
    getProductDataFromProvider
}