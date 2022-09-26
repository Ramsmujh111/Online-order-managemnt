const express = require('express');
const routes = express.Router();
const errorController = require('../controller/error');

routes.use(errorController.error);

module.exports = routes;