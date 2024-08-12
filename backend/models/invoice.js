/**
 * Define el modelo `Invoice` en Sequelize.
 * 
 * Este modelo representa una factura en la base de datos y está asociado con el modelo `Customer`.
 * 
 * @param {Object} sequelize - La instancia de Sequelize.
 * @param {Object} DataTypes - Un objeto que contiene los tipos de datos proporcionados por Sequelize.
 * 
 * @returns {Object} El modelo `Invoice` definido en Sequelize.
 */
module.exports = (sequelize, DataTypes) => {
  const Invoice = sequelize.define('Invoice', {
    /**
     * ID de la factura.
     * 
     * @type {number}
     * @property {boolean} primaryKey - Es la clave primaria de la tabla.
     * @property {boolean} autoIncrement - El ID se incrementa automáticamente.
     */
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    /**
     * ID del cliente asociado con la factura.
     * 
     * @type {number}
     * @property {boolean} allowNull - No se permite `null`.
     */
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    /**
     * Fecha de la factura.
     * 
     * @type {Date}
     * @property {boolean} allowNull - No se permite `null`.
     */
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    /**
     * Nombre del producto o servicio facturado.
     * 
     * @type {string}
     * @property {boolean} allowNull - No se permite `null`.
     */
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    /**
     * Precio del producto o servicio facturado.
     * 
     * @type {number}
     * @property {boolean} allowNull - No se permite `null`.
     * @property {number} precision - 10 dígitos en total, 2 de ellos decimales.
     */
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    /**
     * Valor del descuento aplicado a la factura.
     * 
     * @type {number}
     * @property {number} precision - 5 dígitos en total, 2 de ellos decimales.
     * @property {number} defaultValue - El valor predeterminado es 0.
     */
    discountValue: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 0,
    },

    /**
     * Valor del IVA aplicado a la factura.
     * 
     * @type {number}
     * @property {boolean} allowNull - No se permite `null`.
     * @property {number} precision - 5 dígitos en total, 2 de ellos decimales.
     */
    vat: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },

    /**
     * Valor total de la factura después de aplicar descuentos e impuestos.
     * 
     * @type {number}
     * @property {boolean} allowNull - No se permite `null`.
     * @property {number} precision - 10 dígitos en total, 2 de ellos decimales.
     */
    totalValue: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  });

  /**
   * Define las asociaciones del modelo `Invoice`.
   * 
   * Una factura pertenece a un cliente (`Customer`).
   * 
   * @function associate
   * @param {Object} models - Un objeto que contiene todos los modelos definidos en la aplicación.
   */
  Invoice.associate = (models) => {
    Invoice.belongsTo(models.Customer, { foreignKey: 'customerId' });
  };

  return Invoice;
};
