const express = require('express');
const router = express.Router();
const itemTypeController = require('../controllers/itemTypeController');

router.post('/itemType/createItemType', itemTypeController.createItemType);
router.post('/itemType/allTypesItem', itemTypeController.allItemType);

module.exports = router;