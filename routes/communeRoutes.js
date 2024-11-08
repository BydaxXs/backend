const express = require('express');
const router = express.Router();
const communeController = require('../controllers/communeController');

router.post('/commune/createCommune', communeController.createCommune);
router.post('/commune/deleteCommune', communeController.deleteCommune);
router.post('/commune/allCommuneOf', communeController.allCommunesOfCountry);

module.exports = router