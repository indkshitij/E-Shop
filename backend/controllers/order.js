import dotenv from "dotenv";
dotenv.config();

import OrderModel from "../models/orderModel.js";
import CartModel from "../models/cartItem.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createOrder = async (req, res) => {
  try {
    const { products, shippingAddress } = req.body;
    const userId = req.user.id;

    if (!products || products.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No products in order" });
    }

    const totalAmount = products.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100),
      currency: "inr",
      metadata: { userId: userId.toString() },
    });

    const order = await OrderModel.create({
      userId,
      products: products.map((p) => ({ product: p._id, quantity: p.quantity })),
      totalAmount,
      shippingAddress,
      paymentIntentId: paymentIntent.id,
      isPaid: false,
    });
    await CartModel.deleteMany({ userId });

    res.status(201).json({
      success: true,
      message: "Order created",
      order,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error in createOrder:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// mark order paid after payment
export const markOrderPaid = async (req, res) => {
  try {
    const { paymentIntentId } = req.body;

    const order = await OrderModel.findOne({ paymentIntentId });
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    order.isPaid = true;
    await order.save();

    res
      .status(200)
      .json({ success: true, message: "Order marked as paid", order });
  } catch (error) {
    console.error("Error in markOrderPaid:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// get orders
export const getOrdersByUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await OrderModel.find({ userId })
      .populate("products.product")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: orders.length, orders });
  } catch (error) {
    console.error("Error in getOrdersByUser:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
