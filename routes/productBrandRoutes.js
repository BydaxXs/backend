const express = require('express');
const router = express.Router();
const productBrandController = require('../controllers/productBrandController');

router.post('/productBrand/createBrand', productBrandController.createProductBrand);
router.post('/productBrand/getAllProductBrand',productBrandController.getAllProductBrand);

module.exports = router;