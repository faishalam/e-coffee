const { Address } = require("../models");

class AddressController {
  static async createAddress(req, res) {
    try {
      const { id } = req.user;
      const { address, country, city, postalCode } = req.body;
      if (!address)
        return res.status(400).json({ message: "address is required" });
      const newAddress = await Address.create({
        userId: id,
        address,
        country,
        city,
        postalCode,
      });
      res.status(200).json(newAddress);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({ message: error.errors[0].message });
      }
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({ message: error.errors[0].message });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  }
  static async getUserAddress(req, res) {
    try {
      const { id } = req.user;
      const addresses = await Address.findAll({ where: { userId: id } });
      res.status(200).json(addresses);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({ message: error.errors[0].message });
      }
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({ message: error.errors[0].message });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async updateAddress(req, res) {
    try {
      const { id } = req.params;
      const { address, country, city, postalCode } = req.body;
      await Address.update(
        { address, country, city, postalCode },
        { where: { id } }
      );
      res.status(200).json({ message: "Address updated successfully" });
    } catch (error) {
      console.log(error, "error");
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async deleteAddress(req, res) {
    try {
      const { id } = req.params;
      await Address.destroy({ where: { id } });
      res.status(200).json({ message: "Address deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = AddressController;
