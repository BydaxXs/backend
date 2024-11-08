const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');

router.post('/brand/createBrand', brandController.createBrand);
router.post('/brand/allBrands', brandController.allBrands);

module.exports = router;