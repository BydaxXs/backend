const express = require('express');
const router = express.Router();
const actionController = require('../controllers/actionController');

router.post('/action/createAction', actionController.createAction);
router.post('/action/viewAllActions', actionController.viewAllActions);
router.post('/action/getAllActionsByProcess', actionController.getAllActionsByProcess);

module.exports = router;