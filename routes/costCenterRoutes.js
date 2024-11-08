const express = require('express');
const router = express.Router()
const costCenterController = require('../controllers/costCenterController');

router.post('/costCenter/createCostCenter', costCenterController.createCostCenter);
router.post('/costCenter/allCostCenters', costCenterController.getAllCostCenters);
router.post('/costCenter/deleteCostCenter', costCenterController.deleteCostCenter);
router.post('/costCenter/allCostCenterExpectCritics', costCenterController.getAllCostCentersExcepSuperAdmin);

module.exports = router;