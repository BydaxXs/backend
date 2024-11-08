const express = require('express');
const router = express.Router();
const providerController = require('../controllers/providerController');

router.post('/provider/createProvider', providerController.createProvider);
router.post('/provider/getAllProviders', providerController.viewAllProviders);
router.post('/provider/addProductProvider', providerController.assingProductProvider);
router.post('/provider/getProductFromProvider', providerController.getProductDataFromProvider);

module.exports = router