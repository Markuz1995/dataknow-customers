const { Customer } = require('../models');

/**
 * Crea un nuevo cliente en la base de datos.
 * 
 * @async
 * @function createCustomer
 * @param {Object} req - Objeto de solicitud de Express, que contiene los datos del cliente en `req.body`.
 * @param {string} req.body.customerName - Nombre del cliente.
 * @param {string} req.body.identificationType - Tipo de identificación del cliente (por ejemplo, "CC", "NIT").
 * @param {string} req.body.identificationNumber - Número de identificación del cliente.
 * @param {string} [req.body.notes] - Observaciones adicionales sobre el cliente (opcional).
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {function} next - Función middleware de Express para pasar el control al siguiente middleware.
 * @returns {Promise<void>} Retorna una promesa que se resuelve al finalizar la operación.
 * 
 * @throws {Error} Lanza un error si ocurre un problema al crear el cliente.
 */
exports.createCustomer = async (req, res, next) => {
  try {
    const { customerName, identificationType, identificationNumber, notes } = req.body;
    const customer = await Customer.create({ customerName, identificationType, identificationNumber, notes });
    res.status(201).json(customer);
  } catch (error) {
    next(error);
  }
};

/**
 * Obtiene todos los clientes de la base de datos.
 * 
 * @async
 * @function getCustomers
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {function} next - Función middleware de Express para pasar el control al siguiente middleware.
 * @returns {Promise<void>} Retorna una promesa que se resuelve con un array de objetos `Customer`.
 * 
 * @throws {Error} Lanza un error si ocurre un problema al obtener los clientes.
 */
exports.getCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.findAll();
    res.json(customers);
  } catch (error) {
    next(error);
  }
};
