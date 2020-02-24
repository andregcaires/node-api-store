'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.getAll = () => {
    return Product.find({}, 'title slug price tags');
}

exports.getById = (id) => {
    return Product.findById({
        slug: id,
        active:true
    }, 'title slug price tags');
}

exports.getByTag = (tags) => {
    return Product.find({
        tags: tags,
        active:true
    }, 'title slug price tags');
}

exports.getBySlug = (slug) => {
    return Product.findOne({
        slug: slug,
        active:true
    }, 'title slug price tags');
}

exports.update = (id, data) => {

    return Product.findByIdAndUpdate(id, {
        $set: {
            title: data.title,
            description: data.description,
            price: data.price
        }
    });
}

exports.delete = (id) => {
    return Product.findOneAndRemove(id);
}

exports.create = (data) => {
    let product = new Product(data);
    return product.save()
}
