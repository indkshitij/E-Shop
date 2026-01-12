import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { Link } from "react-router-dom";

const CartButton = () => {
  const { cartCount, loadingCart } = useContext(AppContext);

  return (
    <Link
      to="/cart"
      className="relative flex items-center justify-center p-2 rounded-md hover:bg-gray-100 transition duration-200"
    >
      <HiOutlineShoppingCart className="w-6 h-6 text-gray-800" />

      {/* Badge */}
      {!loadingCart && cartCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
          {cartCount}
        </span>
      )}
    </Link>
  );
};

export default CartButton;
