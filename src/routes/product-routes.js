'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller');
const authService = require('../services/auth-service');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.get('/tags/:tags', controller.getByTag);
router.get('/:slug', controller.getBySlug);
router.post('/', authService.isAdmin, controller.post);
router.put('/:id', authService.isAdmin, controller.put);
router.delete('/', authService.isAdmin, controller.delete);

module.exports = router;