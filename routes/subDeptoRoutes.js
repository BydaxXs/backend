const express = require('express');
const router = express.Router();
const subDeptoController = require('../controllers/subDeptoController');

router.post('/subDepto/createSubDepto', subDeptoController.createAssignSubDepto);
router.post('/subDepto/getAllSubdetoOfDepto', subDeptoController.viewAllSubDeptosOfDepto);

module.exports = router;