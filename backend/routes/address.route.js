const express = require('express');
const router = express.Router();
const { createAddressUser, getAllAddressbyUser } = require('../controllers/address.controller');
const { authenticateUser, authorizeRoles } = require('../middleware/auth.middleware');

router.post('/create', createAddressUser);
router.get('/', authenticateUser ,getAllAddressbyUser);

module.exports = router;
