const express = require('express');
const router = express.Router();

const { sendRequestPaymentToken } = require('../controllers/payments.controller');
const {authenticateUser, authorizeRoles} = require('../middleware/auth.middleware');


router.post('/', sendRequestPaymentToken);

module.exports = router;