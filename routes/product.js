const express = require('express');
const routes = express.Router();
const ProductController = require('../controller/product');

routes.post('/product',ProductController.AddProducts);
routes.get('/product/:id',ProductController.findById);
routes.get('/product',ProductController.allProduct);


module.exports = routes;