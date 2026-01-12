import { Router } from "express";
import {
  addToCart,
  removeFromCart,
  getCartItems,
} from "../controllers/cart.js";
import authMiddleware from "../middleware/authMiddleware.js"
const cartRouter = Router();

cartRouter.get("/",authMiddleware, getCartItems);
cartRouter.post("/add",authMiddleware, addToCart);
cartRouter.post("/remove",authMiddleware, removeFromCart);

export default cartRouter;
