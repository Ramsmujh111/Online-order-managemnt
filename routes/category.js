const express = require('express');
const routes = express.Router();
const CategoryController = require('../controller/category');

routes.post('/category' , CategoryController.AddCategory);
routes.delete('/category/:id',CategoryController.deleteCategory);
routes.get('/category/:id',CategoryController.findById);
routes.get('/category',CategoryController.findAll);
routes.put('/category/:id',CategoryController.updateCategory);

module.exports = routes;