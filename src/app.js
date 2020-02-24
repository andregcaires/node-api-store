'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// conecta ao BD
mongoose.connect('mongodb://localhost:27017/node-store-api', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

// carrega os models
const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');

// carrega as rotas
const indexRoutes = require('./routes/index');
const productRoutes = require('./routes/product-routes');
const customerRoutes = require('./routes/customer-routes');
const orderRoutes = require('./routes/order-routes');

// registra bodyparser, que age como middleware para realizar
// conversão do corpo da requisição para json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// registra rotas
app.use('/', indexRoutes);
app.use('/products', productRoutes);
app.use('/customers', customerRoutes);
app.use('/orders', orderRoutes);

module.exports = app;
