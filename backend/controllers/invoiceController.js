const { Invoice, Customer } = require('../models');
const { Op } = require('sequelize');

/**
 * Crea una nueva factura en la base de datos.
 * 
 * @async
 * @function createInvoice
 * @param {Object} req - Objeto de solicitud de Express, que contiene los datos de la factura en `req.body`.
 * @param {number} req.body.customerId - ID del cliente asociado a la factura.
 * @param {string} req.body.date - Fecha de la factura.
 * @param {string} req.body.productName - Nombre del producto o servicio facturado.
 * @param {number} req.body.price - Precio del producto o servicio.
 * @param {number} req.body.discountValue - Valor del descuento aplicado a la factura.
 * @param {number} req.body.vat - Valor del IVA aplicado a la factura.
 * @param {number} req.body.totalValue - Valor total de la factura después de aplicar descuentos e impuestos.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {function} next - Función middleware de Express para pasar el control al siguiente middleware.
 * @returns {Promise<void>} Retorna una promesa que se resuelve al finalizar la operación.
 * 
 * @throws {Error} Lanza un error si ocurre un problema al crear la factura.
 */
exports.createInvoice = async (req, res, next) => {
  try {
    const { customerId, date, productName, price, discountValue, vat, totalValue } = req.body;
    const invoice = await Invoice.create({ customerId, date, productName, price, discountValue, vat, totalValue });
    res.status(201).json(invoice);
  } catch (error) {
    next(error);
  }
};

/**
 * Obtiene un listado paginado de facturas de la base de datos, con filtros opcionales por fecha y cliente.
 * 
 * @async
 * @function getInvoices
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.query - Contiene los parámetros de consulta para la paginación y los filtros.
 * @param {number} [req.query.page=1] - Número de página para la paginación.
 * @param {number} [req.query.limit=10] - Número de facturas por página.
 * @param {string} [req.query.from] - Fecha de inicio para el filtro de rango de fechas (opcional).
 * @param {string} [req.query.to] - Fecha de fin para el filtro de rango de fechas (opcional).
 * @param {number} [req.query.customerId] - ID del cliente para filtrar las facturas por cliente (opcional).
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {function} next - Función middleware de Express para pasar el control al siguiente middleware.
 * @returns {Promise<void>} Retorna una promesa que se resuelve con un objeto que contiene el número total de páginas, la página actual, y un array de facturas.
 * 
 * @throws {Error} Lanza un error si ocurre un problema al obtener las facturas.
 */
exports.getInvoices = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, from, to, customerId } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = {};
    if (from && to) {
      whereClause.date = { [Op.between]: [new Date(from), new Date(to)] };
    }
    if (customerId) {
      whereClause.customerId = customerId;
    }

    const { count, rows } = await Invoice.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [{ model: Customer, attributes: ['customerName'] }],
    });

    res.json({
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      invoices: rows,
    });
  } catch (error) {
    next(error);
  }
};
