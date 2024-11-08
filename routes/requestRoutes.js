const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');

router.post('/request/createRequest', requestController.createRequest);
router.post('/request/updateRequest', requestController.updateRequestStatus);
router.post('/request/deleteRequest', requestController.deleteRequest);
router.post('/request/lastDocument', requestController.getLastDocument);
router.post('/request/getAllRequests', requestController.getRequest);
router.post('/request/getAllRequestsData', requestController.getAllRequestData);
router.post('/request/getSpecificRequest', requestController.getSpecificRequestData);
router.post('/request/getOwnRequests', requestController.getOwnRequests);
router.post('/request/getDeptoRequests', requestController.getRequestByDepto);
router.post('/request/getSubdeptoRequests', requestController.getRequestBySubdepto);
router.post('/request/downloadCuotations', requestController.copyFolder);

module.exports = router;