import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      min: [1, "Quantity cannot be less than 1"],
      default: 1,
    },
  },
  { timestamps: true }
);

const CartModel = mongoose.model("Cart", cartSchema);
export default CartModel;
