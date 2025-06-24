"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductImage.belongsTo(models.Product, { foreignKey: "productId" });
    }
  }
  ProductImage.init(
    {
      productId: {
        type: DataTypes.INTEGER,
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
      url: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "url is required",
          },
          notEmpty: {
            msg: "url is required",
          },
        },
      },
      isPrimary: DataTypes.BOOLEAN,
      allowNull: false,
    },
    {
      sequelize,
      modelName: "ProductImage",
    }
  );
  return ProductImage;
};
