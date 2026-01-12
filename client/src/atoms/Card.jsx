import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";

const Card = ({ product }) => {
  const { addToCart } = useContext(AppContext);

  const handleAddToCart = () => {
    addToCart(product._id);
  };

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 group">
      <div className="relative">
        <img
          src={product.imageUrl}
          alt={product.productName}
          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-md">
          ₹ {product.price}
        </span>
      </div>

      <div className="p-4 flex flex-col justify-between h-40">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {product.productName}
          </h3>
          <p className="text-gray-500 text-sm mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>

        <button
          onClick={handleAddToCart}
          className="cursor-pointer mt-4 w-full bg-black text-white py-2 rounded-md hover:bg-black/90 active:scale-95 transition-transform duration-200"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
