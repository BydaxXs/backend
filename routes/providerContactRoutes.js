const express = require('express');
const router = express.Router();
const providerContactController = require('../controllers/providerContactController');

router.post('/providerContact/createContact', providerContactController.createContact);
router.post('/providerContact/setContact', providerContactController.setContact);
router.post('/providerContact/unAssignContact', providerContactController.unAssignContact);
router.post('/providerContact/allUnassignedContacts', providerContactController.viewAllUnassignedContacts);

module.exports = router;