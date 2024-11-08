const express = require('express');
const router = express.Router();
const taxDocumentController = require('../controllers/taxDocumentController');

router.post('/taxDocument/createTaxDocument', taxDocumentController.createTaxDocument);
router.post('/taxDocument/deleteTaxDocument/:id', taxDocumentController.deleteTaxDocument);
router.post('/taxDocument/getAllDocuments', taxDocumentController.allTaxDocuments);
router.post('/taxDocument/searchAnyDocument', taxDocumentController.searchAny);

module.exports = router