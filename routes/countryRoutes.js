const express = require('express');
const router = express.Router();
const countryController = require('../controllers/countryController');

router.post('/country/createCountry', countryController.createCountry);
router.post('/country/deleteCountry', countryController.deleteCountry);
router.post('/country/allCountries', countryController.allCountries);

module.exports = router;