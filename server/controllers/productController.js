const { Product } = require("../models");

class ProductController {
  static async createProduct(req, res) {
    try {
      const { id } = req.user;
      const {
        productName,
        description,
        price,
        stock,
        unit,
        category,
        productType,
      } = req.body;

      const newProduct = await Product.create({
        userId: id,
        productType,
        productName,
        description,
        price,
        stock,
        unit,
        category,
      });
      res.status(200).json(newProduct);
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

  static async getProducts(req, res) {
    try {
      const products = await Product.findAll();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getProductById(req, res) {
    try {
      const { id } = req.params;
      const products = await Product.findByPk(id);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      const { productName, description, price, stock, unit, category } =
        req.body;

      await Product.update(
        { productName, description, price, stock, unit, category },
        { where: { id } }
      );
      res.status(200).json({ message: "Product updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const findProduct = await Product.findByPk(id);
      if (!findProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      await Product.destroy({ where: { id } });
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = ProductController;
