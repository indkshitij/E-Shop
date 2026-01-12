import React, { useContext, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { AppContext } from "../Context/AppContext";
import { toast } from "react-hot-toast";

const CheckoutForm = ({ total }) => {
  const { cartItems, createOrder, fetchCartItems, markOrderPaid } = useContext(AppContext);
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || cartItems.length === 0) return;

    setLoading(true);
    try {
      const orderData = {
        products: cartItems.map((item) => ({
          _id: item.product._id,
          quantity: item.quantity,
          price: item.product.price,
        })),
        shippingAddress: "Magnet Brain Office", 
      };

      const res = await createOrder(orderData);
      if (!res?.clientSecret) throw new Error("Failed to create order");

      const result = await stripe.confirmCardPayment(res.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        toast.success("Payment successful!");

        await markOrderPaid(result.paymentIntent.id);

        fetchCartItems();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      console.error("Payment error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handlePayment}
      className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto space-y-6"
    >
      <h2 className="text-2xl font-bold text-center mb-4">Checkout</h2>

      <div className="p-4 border rounded bg-gray-50">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#111827",
                fontFamily: "Inter, sans-serif",
                "::placeholder": { color: "#9ca3af" },
                padding: "12px",
              },
              invalid: { color: "#ef4444" },
            },
          }}
        />
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className={`w-full py-3 rounded-lg text-white font-semibold transition ${
          loading ? "bg-gray-600 cursor-not-allowed" : "bg-black hover:bg-gray-800 cursor-pointer"
        }`}
      >
        {loading ? "Processing..." : `Pay ₹ ${total}`}
      </button>

      <p className="text-center text-gray-500 text-sm">
        Secure payment with Stripe
      </p>
    </form>
  );
};

export default CheckoutForm;
