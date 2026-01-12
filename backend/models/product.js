import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    productName: String,
    price: Number,
    description: String,
    imageUrl: String,
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("Product", ProductSchema);
export default ProductModel;
