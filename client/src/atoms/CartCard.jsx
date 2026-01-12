import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";

const CartCard = ({ item }) => {
  const { removeFromCart } = useContext(AppContext);

  const subtotal = item.product.price * item.quantity;

  return (
    <div className="flex items-center bg-white p-4 rounded-lg shadow">
      <img
        src={item.product.imageUrl}
        alt={item.product.name}
        className="w-24 h-24 object-cover rounded"
      />
      <div className="ml-4 flex-1">
        <h3 className="text-lg font-semibold">{item.product.productName}</h3>
        <p className="text-gray-500 mt-1">
          ₹ {item.product.price} x {item.quantity}
        </p>
        <p className="text-gray-900 font-bold mt-1">Subtotal: ₹ {subtotal}</p>
      </div>
      <button
        onClick={() => removeFromCart(item.product._id)}
        className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition cursor-pointer"
      >
        Remove
      </button>
    </div>
  );
};

export default CartCard;
