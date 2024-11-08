const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');
const uploadController = require('../controllers/uploadController');

router.post('/uploads/:requestID', requestController.addQuotation, uploadController.uploadFile);

module.exports = router;
