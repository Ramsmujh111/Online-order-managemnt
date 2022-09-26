const express = require('express');
const routes = express.Router();
const authController = require('../controller/auth');


routes.post('/register' ,authController.registration);
routes.post('/login',authController.login);


module.exports = routes;