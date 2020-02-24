'use strict'

const ValidationContract = require('../validators/fluent-validator')
const repository = require('../repositories/order-repository')
const guid = require('guid');

exports.getAll = async (req, res, next) => {
    const data = await repository.getAll();
    try {
        res.status(200).send(data);
    }
    catch (err) {
        res.status(500).send({
            mensagem: "Erro ao processar requisição"
        });
    }
}

exports.getById = (req, res, next) => {
    repository.getById(req.params.id)
    .then(data => {
        res.status(200).send({ data });
    })
    .catch(err => {
        res.status(400).send({ err });
    });
}

exports.post = (req, res, next) => {

    let data = {
        customer: req.body.customer,
        number: guid.raw().substring(0,6),
        items: req.body.items
    };

    // gera guid com 6 caracteres
    data.number = guid.raw().substring(0,6);

    if(data.items.length == 0) {
        res.status(400).send("Favor informar itens no pedido").end();
        return;
    }

    repository.create(data)
        .then(x => {
            res.status(201).send({
                message:'Pedido cadastrado com sucesso'
            });
        })
        .catch(err => {
            res.status(400).send({
                message: 'Erro ao cadastrar pedido',
                data: err
            });
        });    
};
