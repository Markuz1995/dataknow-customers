'use strict';

module.exports = (sequelize, DataTypes) => {
  const Invoice = sequelize.define('Invoice', {
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    discountValue: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 0
    },
    vat: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false
    },
    totalValue: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  }, {});
  Invoice.associate = function(models) {
    Invoice.belongsTo(models.Customer, { foreignKey: 'customerId' });
  };
  return Invoice;
};
