const express = require('express');
const router = express.Router();
const productCategoryController = require('../controllers/productCategoryController');

router.post('/productCategory/createCategory', productCategoryController.createProductCategory);
router.post('/productCategory/getAllCategories', productCategoryController.getAllProductCategories);

module.exports = router;