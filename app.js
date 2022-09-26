const express = require('express');
require('dotenv').config();
const AdminRoutes = require('./routes/admin');
const mongoose = require('mongoose');
const ErrorRoutes = require('./routes/error');
const CategoryRoutes = require('./routes/category');
const ProductRoutes = require('./routes/product');
const Logger = require('./service/winston')
const authRoutes = require('./routes/auth');
const authJwt = require('./middleware/authentication');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT
// middleware
app.use(express.json());
app.use(morgan('dev'));
// authentication middleware
app.use(authJwt);
// Routes
app.use('/Admin',AdminRoutes);
app.use('/api/v1/users',authRoutes)
app.use('/api/v1',CategoryRoutes);
app.use('/api/v1',ProductRoutes);
app.use(ErrorRoutes)


mongoose.connect(process.env.MONGO_URL)
.then((result)=>{
    Logger.info(`Database is connected...`);
    app.listen(port,()=>{
        Logger.info(`server is Running on the PORT : ${port}`);
    })
})
.catch(err=>{
    Logger.error(err.message);
    Logger.error(`Database is not connected`);
    
})