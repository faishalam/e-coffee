const { Cart, CartItem, Product } = require("../models");

class CartController {
  // Ambil isi keranjang user
  static async getCart(req, res) {
    try {
      const { id: userId } = req.user;

      const cart = await Cart.findOne({
        where: { userId },
        include: {
          model: CartItem,
          include: Product,
        },
      });

      if (!cart) {
        return res.status(200).json({ message: "Cart is empty", items: [] });
      }

      res.status(200).json(cart);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }

  static async addToCart(req, res) {
    try {
      const { id: userId } = req.user;
      const { productId, quantity } = req.body;

      let cart = await Cart.findOne({ where: { userId } });
      if (!cart) {
        cart = await Cart.create({ userId });
      }

      const existingItem = await CartItem.findOne({
        where: { cartId: cart.id, productId },
      });

      if (existingItem) {
        existingItem.quantity += quantity;
        await existingItem.save();
      } else {
        await CartItem.create({
          cartId: cart.id,
          productId,
          quantity,
        });
      }

      res.status(201).json({ message: "Product added to cart" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }

  static async updateCartItem(req, res) {
    try {
      const { id: userId } = req.user;
      const { productId } = req.params;
      const { quantity } = req.body;

      if (quantity < 1) {
        return res.status(400).json({ message: "Quantity must be at least 1" });
      }
      const cart = await Cart.findOne({ where: { userId } });
      if (!cart) return res.status(404).json({ message: "Cart not found" });

      const item = await CartItem.findOne({
        where: { cartId: cart.id, productId },
      });

      if (!item)
        return res.status(404).json({ message: "Product not found in cart" });

      item.quantity = quantity;
      await item.save();

      res.status(200).json({ message: "Cart item updated" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }

  static async deleteCartItem(req, res) {
    try {
      const { id: userId } = req.user;
      const { productId } = req.params;

      const cart = await Cart.findOne({ where: { userId } });
      if (!cart) return res.status(404).json({ message: "Cart not found" });

      const deleted = await CartItem.destroy({
        where: { cartId: cart.id, productId },
      });

      if (!deleted)
        return res.status(404).json({ message: "Product not found in cart" });

      res.status(200).json({ message: "Cart item removed" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }

  static async clearCart(req, res) {
    try {
      const { id: userId } = req.user;

      const cart = await Cart.findOne({ where: { userId } });
      if (!cart) return res.status(404).json({ message: "Cart not found" });

      await CartItem.destroy({ where: { cartId: cart.id } });

      res.status(200).json({ message: "Cart cleared" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }
}

module.exports = CartController;
