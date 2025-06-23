"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Address.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Address.init(
    {
      userId: {
        type: DataTypes.STRING,
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
      country: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "country is required",
          },
          notEmpty: {
            msg: "country is required",
          },
        },
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "citty is required",
          },
          notEmpty: {
            msg: "citty is required",
          },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "address is required",
          },
          notEmpty: {
            msg: "address is required",
          },
        },
      },
      postalCode: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "postal code is required",
          },
          notEmpty: {
            msg: "postal code is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Address",
    }
  );
  return Address;
};
