import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import CartCard from "../atoms/CartCard";
import OrderSummary from "../atoms/OrderSummary";

const CartPage = () => {
  const { cartItems, loadingCart, createOrder, fetchCartItems } =
    useContext(AppContext);

  const [total, setTotal] = useState(0);

  // Fetch cart items on mount
  useEffect(() => {
    fetchCartItems();
  }, []);

  // Calculate total whenever cart changes
  useEffect(() => {
    const sum = cartItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
    setTotal(sum);
  }, [cartItems]);

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;

    const orderData = {
      products: cartItems.map((item) => ({
        _id: item.product.id, 
        quantity: item.quantity,
        price: item.product.price,
      })),
      shippingAddress: "Magnet Brain Office",
    };

    const res = await createOrder(orderData);
    if (res) {
      console.log("Order created:", res);
     
    }
  };
  useEffect(() => {
    document.title = "Cart | E-Shop";
  }, []);
  return (
    <div className="px-4 md:px-8 lg:px-16 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">My Cart</h1>

      {loadingCart ? (
        <p className="text-center">Loading...</p>
      ) : cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <CartCard key={item.id} item={item} />
            ))}
          </div>

          <OrderSummary total={total} onCheckout={handleCheckout} />
        </div>
      )}
    </div>
  );
};

export default CartPage;
