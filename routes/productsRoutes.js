const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.post('/products/createProduct', productsController.registerProduct);
router.post('/product/setProductToProvider',productsController.setProductToProvider);
router.post('/product/productsData',productsController.getAllProductData);
router.post('/product/filterProductByBrand', productsController.brandFilterProduct);
router.post('/product/filterProductByCategory', productsController.categoryFilterProduct);

module.exports = router