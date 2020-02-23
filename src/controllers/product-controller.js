'use strict'

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/fluent-validator')

exports.getAll = (req, res, next) => {
    Product.find({}, 'title slug price tags')
    .then(data => {
        res.status(200).send({ data });
    })
    .catch(err => {
        res.status(400).send({ err });
    });
}

exports.getById = (req, res, next) => {
    Product.findById({
        slug: req.params.id,
        active:true
    }, 'title slug price tags')
    .then(data => {
        res.status(200).send({ data });
    })
    .catch(err => {
        res.status(400).send({ err });
    });
}

exports.getByTag = (req, res, next) => {
    Product.find({
        tags: req.params.tags,
        active:true
    }, 'title slug price tags')
    .then(data => {
        res.status(200).send({ data });
    })
    .catch(err => {
        res.status(400).send({ err });
    });
}

exports.getBySlug = (req, res, next) => {
    Product.findOne({
        slug: req.params.slug,
        active:true
    }, 'title slug price tags')
    .then(data => {
        res.status(200).send({ data });
    })
    .catch(err => {
        res.status(400).send({ err });
    });
}

exports.post = (req, res, next) => {

    // realiza fluent validations
    let contract = new ValidationContract();
    contract.hasMinLength(req.body.title, 3, 'O título deve conter ao menos 3 caracteres');
    contract.hasMinLength(req.body.slug, 3, 'O slug deve conter ao menos 3 caracteres');

    if(!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    let product = new Product(req.body);
    product.save()
        .then(x => {
            res.status(201).send({
                message:'Produto cadastrado com sucesso'
            });
        })
        .catch(err => {
            res.status(400).send({
                message: 'Erro ao cadastrar produto',
                data: err
            });
        });
    
};

exports.put = (req, res, next) => {

    Product.findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.params.title,
            description: req.params.description,
            price: req.params.price
        }
    }).then(x => {
        res.status(200).send({
            message: "Produto atualizado com sucesso"
        });
    }).catch(err => {
        res.status(400).send({
            message: "Falha ao atualizar produto",
            data: err
        });
    });
};

exports.delete = (req, res, next) => {
    Product.findOneAndRemove(req.body.id)
    .then(x => {
        res.status(200).send({
            message: "Produto removido com sucesso"
        });
    }).catch(err => {
        res.status(400).send({
            message: "Falha ao remover produto",
            data: err
        });
    });
};