const express = require('express');
const router = express.Router();
const addressController = require('../controllers/addressController');

router.post('/address/createAddress', addressController.createAddress);
router.post('/address/allStores', addressController.allStores);
router.post('/address/deleteAddress/:id', addressController.deleteAddress);

module.exports = router;