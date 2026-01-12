import { Router } from "express";
import {
  createOrder,
  markOrderPaid,
  getOrdersByUser,
} from "../controllers/order.js";
import authMiddleware from "../middleware/authMiddleware.js";

const orderRouter = Router();

orderRouter.post("/create", authMiddleware, createOrder);
orderRouter.post("/paid", authMiddleware, markOrderPaid);
orderRouter.get("/", authMiddleware, getOrdersByUser);

export default orderRouter;
