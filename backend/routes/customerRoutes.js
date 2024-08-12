const express = require('express');
const { createCustomer, getCustomers } = require('../controllers/customerController');

const router = express.Router();

/**
 * Ruta para crear un nuevo cliente.
 * 
 * @route POST /customers
 * @access Public
 * @param {function} createCustomer - Controlador que maneja la creación de un nuevo cliente.
 */
router.post('/', createCustomer);

/**
 * Ruta para obtener todos los clientes.
 * 
 * @route GET /customers
 * @access Public
 * @param {function} getCustomers - Controlador que maneja la obtención de todos los clientes.
 */
router.get('/', getCustomers);

module.exports = router;
