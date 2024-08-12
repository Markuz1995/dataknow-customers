const express = require('express');
const cors = require('cors');
const customerRoutes = require('../routes/customerRoutes');
const invoiceRoutes = require('../routes/invoiceRoutes');
const errorHandler = require('../middlewares/errorHandler');

const app = express();

/**
 * Configuración de middlewares.
 * 
 * Se aplica CORS para permitir solicitudes de otros dominios y se configura Express para manejar JSON en las solicitudes.
 */
app.use(cors());
app.use(express.json());

/**
 * Configuración de rutas.
 * 
 * Se definen las rutas para los recursos de `customers` y `invoices`. 
 * Estas rutas estarán disponibles en los endpoints `/api/customers` y `/api/invoices` respectivamente.
 */
app.use('/api/customers', customerRoutes);
app.use('/api/invoices', invoiceRoutes);

/**
 * Middleware de manejo de errores.
 * 
 * Este middleware captura y maneja los errores que ocurran en la aplicación, devolviendo una respuesta JSON con detalles del error.
 */
app.use(errorHandler);

module.exports = app;
