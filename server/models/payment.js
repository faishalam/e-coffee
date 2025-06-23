'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Payment.init({
    orderId: DataTypes.STRING,
    midtransOrderId: DataTypes.STRING,
    transactionStatus: DataTypes.STRING,
    payment_type: DataTypes.STRING,
    gross_amount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};