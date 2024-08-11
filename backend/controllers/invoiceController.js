const { Invoice, Customer } = require('../models');
const { calculateVAT, calculateTotalValue } = require('../services/invoiceService');
const { Op } = require('sequelize');

const createInvoice = async (req, res) => {
  try {
    const { price, discountValue } = req.body;
    const vat = calculateVAT(price);
    const totalValue = calculateTotalValue(price, discountValue, vat);

    const invoiceData = { ...req.body, vat, totalValue };
    const invoice = await Invoice.create(invoiceData);
    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.findAll({
      include: [{ model: Customer, attributes: ['customerName'] }],
      where: {
        date: {
          [Op.between]: [req.query.from, req.query.to]
        },
        ...(req.query.customerId && { customerId: req.query.customerId })
      }
    });
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createInvoice,
  getInvoices
};
