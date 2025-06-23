"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderItem.belongsTo(models.Order, { foreignKey: "orderId" });
      OrderItem.belongsTo(models.Product, { foreignKey: "productId" });
    }
  }
  OrderItem.init(
    {
      orderId: {
        type : DataTypes.INTEGER,
        allowNull: false,
        validate : {
          notNull : {
            msg : "order id is required"
          },
          notEmpty : {
            msg: "order id is required"
          }
        }
      },
      productId: {
        type : DataTypes.INTEGER,
        allowNull: false,
        validate : {
          notNull : {
            msg : "product id is required"
          },
          notEmpty : {
            msg: "product id is required"
          }
        }
      },
      quantity: {
        type : DataTypes.INTEGER,
        allowNull: false,
        validate : {
          notNull : {
            msg : "quantity is required"
          },
          notEmpty : {
            msg: "quantity is required"
          }
        }
      },
      price: {
        type : DataTypes.INTEGER,
        allowNull: false,
        validate : {
          notNull : {
            msg : "price is required"
          },
          notEmpty : {
            msg: "price is required"
          }
        }
      },
    },
    {
      sequelize,
      modelName: "OrderItem",
    }
  );
  return OrderItem;
};
