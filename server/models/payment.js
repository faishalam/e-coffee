"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Payment.belongsTo(models.Order, { foreignKey: "orderId" });
    }
  }
  Payment.init(
    {
      orderId: {
        type : DataTypes.STRING,
        allowNull: false,
        validate : {
          notNull: {
            msg : "order id is required"
          },
          notEmpty : {
            msg : "order id is required"
          }
        }
      },
      midtransOrderId: {
        type : DataTypes.STRING,
        allowNull: false,
        validate : {
          notNull: {
            msg : "midtrans order id is required"
          },
          notEmpty : {
            msg : "midtrans order id is required"
          }
        }
      },
      transactionStatus: {
        type : DataTypes.STRING,
        allowNull: false,
        validate : {
          notNull: {
            msg : "transaction status is required"
          },
          notEmpty : {
            msg : "transaction status is required"
          }
        }
      },
      payment_type: {
        type : DataTypes.STRING,
        allowNull: false,
        validate : {
          notNull: {
            msg : "payment type is required"
          },
          notEmpty : {
            msg : "payment type is required"
          }
        }
      },
      gross_amount: {
        type : DataTypes.INTEGER,
        allowNull: false,
        validate : {
          notNull: {
            msg : "gross amount is required"
          },
          notEmpty : {
            msg : "gross amount is required"
          }
        }
      },
    },
    {
      sequelize,
      modelName: "Payment",
    }
  );
  return Payment;
};
