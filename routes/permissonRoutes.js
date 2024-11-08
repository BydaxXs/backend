const express = require('express');
const router = express.Router()
const permissonController = require('../controllers/permissonController');

router.post('/permissons/addPermisson', permissonController.createPermissons);
router.post('/permissons/getPermissons', permissonController.viewAllPermissons);
router.post('/permissons/deletePermisson', permissonController.deletePermisson);

module.exports = router;
