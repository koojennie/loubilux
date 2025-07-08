const express = require('express');
const router = express.Router();

const {getAllUsers, getUserbyId, updateUser, deleteUser, generateUserId} = require('../controllers/user.controller');
const { register } = require('../controllers/auth.controller');
const { authenticateUser, authorizeRoles } = require('../middleware/auth.middleware');

router.get('/', authenticateUser, authorizeRoles('superadmin', 'admin'), getAllUsers);
// router.get('/', getAllUsers);
router.get("/generateuserid", generateUserId);
router.get('/userbyid/:id', getUserbyId);
router.post('/register', register);
router.put('/:id', authenticateUser, authorizeRoles('superadmin', 'admin'), updateUser);
router.delete('/:id', authenticateUser, authorizeRoles('superadmin', 'admin'), deleteUser);

module.exports = router;