const express = require('express');
const router = express.Router();
const subDeptoFunctionController = require('../controllers/subDeptoFunctionController');

router.post('/subDeptoFunction/createFunction', subDeptoFunctionController.createSubDeptoFunction);
router.post('/subDeptoFunction/getAllFunctionsOfSubDepto', subDeptoFunctionController.viewAllFunctionsOfSubDepto);

module.exports = router;