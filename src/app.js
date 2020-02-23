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

// carrega as rotas
const indexRoutes = require('./routes/index');
const productsRoutes = require('./routes/product-routes');

// registra bodyparser, que age como middleware para realizar
// conversão do corpo da requisição para json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// registra rotas
app.use('/', indexRoutes);
app.use('/products', productsRoutes);

module.exports = app;
