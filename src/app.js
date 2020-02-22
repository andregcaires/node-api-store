'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// carrega as rotas
const indexRoutes = require('./routes/index');
const productsRoutes = require('./routes/products');

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
