'use strict'

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/fluent-validator')
const repository = require('../repositories/product-repository')

exports.getAll = (req, res, next) => {
    repository.getAll()
    .then(data => {
        res.status(200).send({ data });
    })
    .catch(err => {
        res.status(400).send({ err });
    });
}

exports.getById = (req, res, next) => {
    repository.findById(req.params.id)
    .then(data => {
        res.status(200).send({ data });
    })
    .catch(err => {
        res.status(400).send({ err });
    });
}

exports.getByTag = (req, res, next) => {
    repository.getByTag(req.params.tags)
    .then(data => {
        res.status(200).send({ data });
    })
    .catch(err => {
        res.status(400).send({ err });
    });
}

exports.getBySlug = (req, res, next) => {
    repository.getBySlug(req.params.slug)
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

    repository.create(req.body)
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

    repository.update(req.params.id, req.params)
    .then(x => {
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
    repository.delete(req.body.id);
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