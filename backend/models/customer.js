/**
 * Define el modelo `Customer` en Sequelize.
 * 
 * Este modelo representa a un cliente en la base de datos y está asociado con el modelo `Invoice`.
 * 
 * @param {Object} sequelize - La instancia de Sequelize.
 * @param {Object} DataTypes - Un objeto que contiene los tipos de datos proporcionados por Sequelize.
 * 
 * @returns {Object} El modelo `Customer` definido en Sequelize.
 */
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    /**
     * ID del cliente.
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
     * Nombre del cliente.
     * 
     * @type {string}
     * @property {boolean} allowNull - No se permite `null`.
     */
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    /**
     * Tipo de identificación del cliente.
     * 
     * @type {string}
     * @property {boolean} allowNull - No se permite `null`.
     */
    identificationType: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    /**
     * Número de identificación del cliente.
     * 
     * @type {string}
     * @property {boolean} allowNull - No se permite `null`.
     * @property {boolean} unique - Debe ser único en la base de datos.
     */
    identificationNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    /**
     * Observaciones adicionales sobre el cliente.
     * 
     * @type {string}
     */
    notes: {
      type: DataTypes.TEXT,
    },
  });

  /**
   * Define las asociaciones del modelo `Customer`.
   * 
   * Un cliente puede tener muchas facturas (`Invoice`).
   * 
   * @function associate
   * @param {Object} models - Un objeto que contiene todos los modelos definidos en la aplicación.
   */
  Customer.associate = (models) => {
    Customer.hasMany(models.Invoice, { foreignKey: 'customerId' });
  };

  return Customer;
};
