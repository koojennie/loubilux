const express = require('express');
const router = express.Router();

const {getAllUsers, getUserbyId, updateUser, deleteUser} = require('../controllers/user.controller');
const { register } = require('../controllers/auth.controller');

router.get('/', getAllUsers);
router.get('/:id', getUserbyId);
router.post('/', register);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;