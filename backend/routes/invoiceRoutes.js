const express = require('express');
const { createInvoice, getInvoices } = require('../controllers/invoiceController');

const router = express.Router();

/**
 * Ruta para crear una nueva factura.
 * 
 * @route POST /invoices
 * @access Public
 * @param {function} createInvoice - Controlador que maneja la creación de una nueva factura.
 */
router.post('/', createInvoice);

/**
 * Ruta para obtener todas las facturas.
 * 
 * @route GET /invoices
 * @access Public
 * @param {function} getInvoices - Controlador que maneja la obtención de todas las facturas.
 */
router.get('/', getInvoices);

module.exports = router;
