import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/connectDb.js";
import authRouter from "./routes/authRoute.js";
import cartRouter from "./routes/cartRoutes.js";
import productRoute from "./routes/productRoute.js";
import orderRouter from "./routes/OrderRoutes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  })
);

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/cart", cartRouter);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRouter)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
