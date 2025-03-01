const express = require('express');
const { register, login } = require('../controllers/user.controller');
const router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/register', register);
router.post('/login', login);

module.exports = router;
