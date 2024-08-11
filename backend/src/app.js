const express = require('express');
const customerRoutes = require('../routes/customerRoutes');
const invoiceRoutes = require('../routes/invoiceRoutes');
const errorHandler = require('../middlewares/errorHandler');

const app = express();

app.use(express.json());
app.use('/api', customerRoutes);
app.use('/api', invoiceRoutes);
app.use(errorHandler);

module.exports = app;
