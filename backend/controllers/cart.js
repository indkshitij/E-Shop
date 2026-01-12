import CartModel from "../models/cartItem.js";

export const getCartItems = async (req, res) => {
  try {
    const userId = req.user.id; 

    const cartItems = await CartModel.find({ userId })
      .populate({
        path: "product",
        select: "productName price description imageUrl",
      })
      .sort({ createdAt: -1 });

    
    return res.status(200).json({
      success: true,
      count: cartItems.length,
      cartItems: cartItems,
    });
  } catch (error) {
    console.error("Error in getCartItems:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { id: productId } = req.body;
    const userId = req.user.id;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    let cartItem = await CartModel.findOne({ userId, product: productId });

    if (!cartItem) {
      await CartModel.create({
        userId,
        product: productId,
        quantity: 1,
      });
    } else {
      cartItem.quantity += 1;
      await cartItem.save();
    }

    return res.status(200).json({
      success: true,
      message: "Item added to cart successfully",
    });
  } catch (error) {
    console.error("Error in addToCart:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { id: productId } = req.body;
    const userId = req.user.id;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const cartItem = await CartModel.findOne({ userId, product: productId });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
      await cartItem.save();
    } else {
      await CartModel.findOneAndDelete({ userId, product: productId });
    }

    return res.status(200).json({
      success: true,
      message: "Item removed from cart successfully",
    });
  } catch (error) {
    console.error("Error in removeFromCart:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
