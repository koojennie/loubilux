const express = require('express');
const route = express.Router();

const {testController} = require('../controllers/test.controller');

route.get('/test', testController);

module.exports = route;