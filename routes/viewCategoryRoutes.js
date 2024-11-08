const express = require('express');
const router = express.Router();
const viewCategoryController = require('../controllers/viewCategoryController');

router.post('/viewsCategories/createViewCategory', viewCategoryController.createViewCategory);
router.post('/viewsCategories/allViewsCategories', viewCategoryController.viewAllCategories);

module.exports = router;