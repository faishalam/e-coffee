const { Order, CartItem, OrderItem, Cart } = require("../models");

class OrderController {
  static async createOrder(req, res) {
    try {
      const { id: userId } = req.user;
      const { address } = req.body;

      const cart = await Cart.findOne({
        where: { userId },
        include: {
          model: CartItem,
          include: Product,
        },
      });
      if (!cart || cart.CartItems.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
      }
      let totalPrice = 0;
      const items = [];

      for (const item of cart.CartItems) {
        const price = item.Product.price;
        const quantity = item.quantity;
        const subTotal = price * quantity;

        totalPrice += subTotal;

        items.push({
          productId: item.productId,
          quantity,
          price,
        });
      }

      const order = await Order.create({
        userId,
        totalPrice,
        status: "pending",
        address,
      });

      const orderItems = items.map((item) => ({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      }));
      await OrderItem.bulkCreate(orderItems);
      await CartItem.destroy({ where: { cartId: cart.id } });
      res.status(201).json({
        message: "Order created",
        order: {
          id: order.id,
          status: order.status,
          totalPrice: order.totalPrice,
          items,
        },
      });
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

  static async getOrders(req, res) {
    try {
      const { id: userId } = req.user;

      const orders = await Order.findAll({
        where: { userId },
        order: [["createdAt", "DESC"]],
        include: {
          model: OrderItem,
          include: {
            model: Product,
            attributes: ["id", "productName", "price", "imgUrl"],
          },
        },
      });

      res.status(200).json({ orders });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }

  static async getOrderById(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const order = await Order.findOne({
        where: { id, userId },
        include: {
          model: OrderItem,
          include: {
            model: Product,
            attributes: ["id", "productName", "price", "imgUrl"],
          },
        },
      });

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      res.status(200).json({ order });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }

  static async updateOrderStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const validStatus = [
        "pending",
        "paid",
        "shipped",
        "delivered",
        "cancelled",
      ];
      if (!validStatus.includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
      }

      const order = await Order.findByPk(id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      await order.update({ status });

      res.status(200).json({ message: "Order status updated", order });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }
}

module.exports = OrderController;
