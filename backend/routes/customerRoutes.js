const express = require('express');
const customerController = require('../controllers/customerController');

const router = express.Router();

router.post('/customers', customerController.createCustomer);
router.get('/customers', customerController.getCustomers);

module.exports = router;
