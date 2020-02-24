'use strict';

const mongoose = require('mongoose');
const Order = mongoose.model('Order');

// exemplo com uso de async / await
exports.getAll = async () => {
    const res = await Order.find({})
        .populate('customer') // recupera também os dados do cliente
        .populate('items.product');
    return res;
}

exports.getById = (id) => {
    return Order.findById(id);
}

exports.create = (data) => {
    let order = new Order(data);
    return order.save()
}
