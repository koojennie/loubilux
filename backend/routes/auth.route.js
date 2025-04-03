const express = require('express');
const router = express.Router();
const { register, login, logout, me} = require('../controllers/auth.controller');
const { authenticateUser, authorizeRoles } = require('../middleware/auth.middleware');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/', register);
router.get('/me', authenticateUser, me);

module.exports = router;
