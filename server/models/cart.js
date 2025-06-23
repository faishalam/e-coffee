"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.User, { foreignKey: "userId" });
      Cart.hasMany(models.CartItem, { foreignKey: "cartId" });
    }
  }
  Cart.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "user id is required",
          },
          notEmpty: {
            msg: "user id is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};
