'use strict'

const ValidationContract = require('../validators/fluent-validator')
const repository = require('../repositories/customer-repository')
const md5 = require('md5');
const emailService = require('../services/email-service');
const authService = require('../services/auth-service');

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

    repository.create({
        name: req.body.name,
        email: req.body.email,
        password: md5(req.body.password + global.SALT_KEY)
    })
    .then(x => {

        emailService.send(req.body.email, 
            'Bem vindo à Node Store!',
            global.EMAIL_TMPL.replace('{0}', req.body.name));

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

exports.authenticate = async (req, res, next) => {

    try {
        const customer = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        if (!customer) {
            res.status(404).send({
                message: "Usuário ou senha inválidos"
            });
            return;
        }

        let token = await authService.generateToken({ 
            id: customer._id,
            email: customer.email, 
            password: customer.password 
        });
    
        res.status(201).send({
            token: token,
            data: {
                email: customer.email, 
                name: customer.name
            }
        });
    }
    catch (err) {
        res.status(401).send({
            message: "Não autenticado: ",
            data: err
        });
    }
};

exports.refreshToken = async (req, res, next) => {

    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await this.decodeToken(token);

        const customer = await repository.getById(data.id);

        if (!customer) {
            res.status(404).send({
                message: "Usuário não encontrado"
            });
            return;
        }

        let newToken = await authService.generateToken({ 
            id: customer._id,
            email: customer.email, 
            password: customer.password 
        });
    
        res.status(201).send({
            token: newToken,
            data: {
                email: customer.email, 
                name: customer.name
            }
        });
    }
    catch (err) {
        res.status(401).send({
            message: "Não autenticado: ",
            data: err
        });
    }
};
