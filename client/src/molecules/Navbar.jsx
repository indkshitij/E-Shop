import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import CartButton from "../molecules/CartButton";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
    setIsMobileMenuOpen(false);
    window.location.reload();
  };

  const navLinkClass = (path) =>
    `block px-3 py-2 rounded-md text-gray-700 hover:text-black hover:bg-gray-100 transition duration-200 font-medium ${
      location.pathname === path ? "text-black font-semibold" : ""
    }`;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-gray-800 hover:text-black transition"
        >
          E-Shop
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className={navLinkClass("/")}>
            Home
          </Link>
          <Link to="/products" className={navLinkClass("/products")}>
            Products
          </Link>
          {token && (
            <Link to="/orders" className={navLinkClass("/orders")}>
              Orders
            </Link>
          )}
          {token && <CartButton />}
        </div>

        {/* Auth Buttons Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {token ? (
            <button
              onClick={handleLogout}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 active:scale-95 transition-all duration-200 cursor-pointer hover:shadow-xl"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-black transition duration-200 font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 active:scale-95 transition duration-200"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-700 focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <HiX className="w-6 h-6" />
            ) : (
              <HiMenu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-6 pb-4 space-y-2 bg-white shadow-md">
          <Link to="/" className={navLinkClass("/")}>
            Home
          </Link>
          <Link to="/products" className={navLinkClass("/products")}>
            Products
          </Link>
          {token && (
            <Link to="/orders" className={navLinkClass("/orders")}>
              Orders
            </Link>
          )}
          {token && <CartButton />}

          {token ? (
            <button
              onClick={handleLogout}
              className="w-full text-left bg-black text-white px-4 py-2 rounded hover:bg-gray-800 active:scale-95 transition duration-200"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className={navLinkClass("/login")}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block w-full text-center bg-black text-white px-4 py-2 rounded hover:bg-gray-800 active:scale-95 transition duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
