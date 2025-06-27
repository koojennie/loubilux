const express = require('express');
const { createOpname, getAllOpnames,getOpnameById, updateOpname, deleteOpname, getGenerateOpnameId } = require("../controllers/opname.controller");
const { authenticateUser, authorizeRoles } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', authenticateUser, authorizeRoles('admin', 'superadmin'), createOpname);
router.get('/all', authenticateUser, authorizeRoles('admin', 'superadmin'), getAllOpnames);
router.get('/generateId', authenticateUser, authorizeRoles('admin', 'superadmin'), getGenerateOpnameId);
router.get('/:id', authenticateUser, authorizeRoles('admin', 'superadmin'), getOpnameById);
router.put('/:id', authenticateUser, authorizeRoles('admin', 'superadmin'), updateOpname);
router.delete('/:id', authenticateUser, authorizeRoles('admin', 'superadmin'), deleteOpname);

module.exports = router;