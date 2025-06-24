const { Product, ProductImage } = require("../models");

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
      const products = await Product.findAll({
        include: {
          model: ProductImage,
          attributes: ["id", "url", "isPrimary"],
        },
      });
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
  static async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id, {
        include: {
          model: ProductImage,
          attributes: ["id", "url", "isPrimary"],
        },
      });

      if (!product)
        return res.status(404).json({ message: "Product not found" });

      res.status(200).json(product);
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
      await ProductImage.destroy({ where: { productId: id } });
      await Product.destroy({ where: { id } });
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async addProductImage(req, res) {
    try {
      const { id: productId } = req.params;
      const { url, isPrimary } = req.body;

      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (isPrimary) {
        await ProductImage.update(
          { isPrimary: false },
          { where: { productId } }
        );
      }

      const newImage = await ProductImage.create({
        productId,
        url,
        isPrimary: !!isPrimary,
      });

      res.status(201).json(newImage);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }

  static async updateProductImage(req, res) {
    try {
      const { id } = req.params; // imageId
      const { url, isPrimary } = req.body;

      const image = await ProductImage.findByPk(id);
      if (!image) return res.status(404).json({ message: "Image not found" });

      if (isPrimary) {
        await ProductImage.update(
          { isPrimary: false },
          { where: { productId: image.productId } }
        );
      }

      await image.update({ url, isPrimary: !!isPrimary });

      res.status(200).json({ message: "Image updated", image });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async deleteProductImage(req, res) {
    try {
      const { id } = req.params;
      const image = await ProductImage.findByPk(id);
      if (!image) return res.status(404).json({ message: "Image not found" });

      await image.destroy();

      res.status(200).json({ message: "Image deleted" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = ProductController;
