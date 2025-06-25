const { Order, OrderItem, Product } = require("../models");
const midtransClient = require("midtrans-client");

class PaymentController {
  // STEP 1: GET SNAP TOKEN
  static async getPaymentToken(req, res) {
    try {
      const { id } = req.params;
      const order = await Order.findByPk(id, {
        include: {
          model: OrderItem,
          include: Product,
        },
      });

      if (!order) return res.status(404).json({ message: "Order not found" });

      const snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });

      const parameter = {
        transaction_details: {
          order_id: `ORDER-${order.id}-${new Date().getTime()}`,
          gross_amount: order.totalPrice,
        },
        customer_details: {
          email: req.user.email,
        },
      };

      const transaction = await snap.createTransaction(parameter);
      res.status(200).json({ token: transaction.token });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to get Snap token", error: error.message });
    }
  }

  // STEP 2: MIDTRANS NOTIFICATION HANDLER
  static async handleNotification(req, res) {
    try {
      const snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });

      const notification = req.body;
      const statusResponse = await snap.transaction.notification(notification);

      const { order_id, transaction_status } = statusResponse;
      const orderId = order_id.split("-")[1];

      const order = await Order.findByPk(orderId, {
        include: OrderItem,
      });

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      if (transaction_status === "settlement" || transaction_status === "capture") {
        await order.update({ status: "paid" });

        for (const item of order.OrderItems) {
          const product = await Product.findByPk(item.productId);
          if (product) {
            if (product.stock < item.quantity) {
              console.warn(`Stock too low for product ${product.id}`);
              continue;
            }
            product.stock -= item.quantity;
            await product.save();
          }
        }
      } else if (
        transaction_status === "cancel" ||
        transaction_status === "expire" ||
        transaction_status === "deny"
      ) {
        await order.update({ status: "cancelled" });
      } else if (transaction_status === "pending") {
        await order.update({ status: "pending" });
      }
      res.status(200).json({ message: "Notification processed" });
    } catch (error) {
      console.error("Midtrans notif error:", error);
      res.status(500).json({ message: "Failed to process notification" });
    }
  }
}

module.exports = PaymentController;
