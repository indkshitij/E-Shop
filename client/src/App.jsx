import React from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./molecules/Navbar";
import HomePage from "./organisms/HomePage";
import LoginPage from "./organisms/LoginPage";
import RegisterPage from "./organisms/RegisterPage";
import CartPage from "./organisms/CartPage";
import Products from "./organisms/Products";
import OrdersPage from "./organisms/OrdersPage";
import Footer from "./molecules/Footer";

import "./App.css";

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={token ? <Navigate to="/products" replace /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={token ? <Navigate to="/products" replace /> : <RegisterPage />}
        />
        <Route path="/products" element={<Products />} />

        <Route
          path="/cart"
          element={token ? <CartPage /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/orders"
          element={token ? <OrdersPage /> : <Navigate to="/login" replace />}
        />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
