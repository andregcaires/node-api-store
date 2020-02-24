'use strict'

const ValidationContract = require('../validators/fluent-validator')
const repository = require('../repositories/customer-repository')

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

    // realiza fluent validations
    let contract = new ValidationContract();
    contract.hasMinLength(req.body.name, 2, 'O name deve conter ao menos 2 caracteres');
    contract.hasMinLength(req.body.email, 3, 'O email deve conter ao menos 3 caracteres');
    contract.hasMinLength(req.body.password, 6, 'O password deve conter ao menos 6 caracteres');

    if(!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    repository.create(req.body)
        .then(x => {
            res.status(201).send({
                message:'Cliente cadastrado com sucesso'
            });
        })
        .catch(err => {
            res.status(400).send({
                message: 'Erro ao cadastrar cliente',
                data: err
            });
        });
    
};
