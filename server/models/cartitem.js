"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CartItem.belongsTo(models.Cart, { foreignKey: "cartId" });
      CartItem.belongsTo(models.Product, { foreignKey: "productId" });
    }
  }
  CartItem.init(
    {
      productId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "product id is required",
          },
          notEmpty: {
            msg: "product id is required",
          },
        },
      },
      cartId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "cart id is required",
          },
          notEmpty: {
            msg: "cart id is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "CartItem",
    }
  );
  return CartItem;
};
