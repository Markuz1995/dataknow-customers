'use strict';

module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 255]
      }
    },
    identificationType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    identificationNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: true,
        notEmpty: true
      }
    },
    notes: {
      type: DataTypes.TEXT
    }
  }, {});
  Customer.associate = function(models) {
    Customer.hasMany(models.Invoice, { foreignKey: 'customerId' });
  };
  return Customer;
};
