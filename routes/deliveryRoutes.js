const express = require('express');
const router = express.Router();
const deliveryController = require('../controllers/deliveryController');

router.post('/deliveryOrder/createDelivery', deliveryController.createDeliveryOrder);
router.post('/deliveryOrder/allDeliveryOrders', deliveryController.viewAllDeliveryOrders);
router.post('/delivery/searchAnyOrder', deliveryController.searchAnyOrder);
module.exports = router;