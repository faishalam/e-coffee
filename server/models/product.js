"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User, { foreignKey: "userId" });
      Product.hasMany(models.CartItem, { foreignKey: "productId" });
      Product.hasMany(models.OrderItem, { foreignKey: "productId" });
      Product.hasMany(models.ProductImage, { foreignKey: "productId" });
    }
  }
  Product.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "user id is required",
          },
          notEmpty: {
            msg: "user id is required",
          },
        },
      },
      productType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "product type is required",
          },
          notEmpty: {
            msg: "product type is required",
          },
        },
      },
      productName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "product name is required",
          },
          notEmpty: {
            msg: "product name is required",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "description is required",
          },
          notEmpty: {
            msg: "description is required",
          },
        },
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "category is required",
          },
          notEmpty: {
            msg: "category is required",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "price is required",
          },
          notEmpty: {
            msg: "price is required",
          },
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "stock is required",
          },
          notEmpty: {
            msg: "stock is required",
          },
        },
      },
      unit: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
