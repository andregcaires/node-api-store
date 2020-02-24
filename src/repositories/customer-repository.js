'use strict';

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

// exemplo com uso de async / await
exports.getAll = async () => {
    const res = await Customer.find({});
    return res;
}

exports.getById = (id) => {
    return Customer.findById(id);
}

exports.create = (data) => {
    let customer = new Customer(data);
    return customer.save()
}
