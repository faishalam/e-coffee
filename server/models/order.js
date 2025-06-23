"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, { foreignKey: "userId" });
      Order.hasMany(models.OrderItem, { foreignKey: "orderId" });
      Order.hasOne(models.Payment, { foreignKey: "orderId" });
    }
  }
  Order.init(
    {
      userId: {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
          notNull : {
            msg : "user id is required"
          },
          notEmpty : {
            msg : "user id is required"
          }
        }
      },
      address: {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
          notNull : {
            msg : "address is required"
          },
          notEmpty : {
            msg : "address is required"
          }
        }
      },
      status: {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
          notNull : {
            msg : "status is required"
          },
          notEmpty : {
            msg : "status is required"
          }
        }
      },
      totalPrice: {
        type : DataTypes.INTEGER,
        allowNull : false,
        validate : {
          notNull : {
            msg : "total price is required"
          },
          notEmpty : {
            msg : "total price is required"
          }
        }
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
