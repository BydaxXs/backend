const express = require('express');
const router = express.Router();
const viewsController = require('../controllers/viewsController');

router.post("/views/createDataView", viewsController.createViewData);
router.post("/views/deleteDataView", viewsController.deleteViewData);
router.post("/views/getAllDataView", viewsController.getAllDataViews);

module.exports = router