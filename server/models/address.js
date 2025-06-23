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
          notNull : {
            msg : "user id is required"
          },
          notEmpty: {
            msg : "user id is required"
          }
        }
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull : {
            msg : "address is required"
          },
          notEmpty: {
            msg : "address is required"
          }
        }
      },
    },
    {
      sequelize,
      modelName: "Address",
    }
  );
  return Address;
};
