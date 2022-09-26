const express = require('express');
const routes = express.Router();
const AdminController = require('../controller/admin');


routes.get('/HomeRoute',AdminController.HomePage);
routes.get('/users',AdminController.users);
routes.get('/users/:id',AdminController.findById);


module.exports = routes;


