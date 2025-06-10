const express = require('express');
const router = express.Router();
const { createAddressUser, getAllAddressbyUser, updateAddress, deleteAddress } = require('../controllers/address.controller');
const { authenticateUser, authorizeRoles } = require('../middleware/auth.middleware');

router.post('/create', createAddressUser);
router.get('/', authenticateUser ,getAllAddressbyUser);
router.put('/:id', authenticateUser, updateAddress);
router.delete('/:id', authenticateUser, deleteAddress);

module.exports = router;
