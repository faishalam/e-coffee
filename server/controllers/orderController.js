const { Order } = require("../models");

class OrderController {
  static async createOrder(req, res) {
    try {
      const { id } = req.user;
      const { address, totalPrice } = req.body;
      const newOrder = await Order.create({
        userId: id,
        address,
        totalPrice,
        status: "pending",
      });
      res.status(200).json(newOrder);
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
      const orders = await Order.findAll({ where: { userId: req.user.id } });
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getOrdersById(req, res) {
    try {
      const { id } = req.params;
      const findOrder = await Order.findByPk(id, {
        include: [
          {
            model: User,
            attributes: { exclude: ["password"] },
          },
          {
            model: OrderItem,
            include: [Product],
          },
        ],
      });
      if (!findOrder)
        return res.status(404).json({ message: "Order not found" });

      res.status(200).json(findOrder);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  }

  static async updateStatusOrder(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      await Order.update({ status }, { where: { id } });
      res.status(200).json({ message: "Status updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async deleteOrder(req, res) {
    try {
      const { id } = req.params;
      await Order.destroy({ where: { id } });
      res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = OrderController;
