'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    number: {
        type: String,
        required: true,
        trim: true
    },
    creationDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    status: {
        type: String,
        required: true,
        enum: ['created', 'done'],
        default: 'created'
    },
    customer: { // faz referência ao modelo Customer
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    items: [{
        quantity: {
            type: Number,
            required: true,
            default: 1
        },
        product: { // faz referência ao modelo Product
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
    }]
});

module.exports = mongoose.model('Order', schema);