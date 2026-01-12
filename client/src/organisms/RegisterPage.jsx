import React, { useState,useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const { name, email, password } = formData;

    if (!name || !email || !password) {
      toast.error("All fields are required");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Invalid email address");
      return false;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/register`,
        formData
      );

      toast.success(res.data.message);
      localStorage.setItem("token", res.data.token);

      navigate("/products");

      setFormData({ name: "", email: "", password: "" });
      window.location.reload();

    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

    useEffect(() => {
    document.title = "Register | E-Shop";
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm space-y-5 transition-transform duration-300 hover:shadow-xl"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Create Account
        </h2>

        <p className="text-sm text-center text-gray-500">
          Sign up to get started
        </p>

        <div className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-black hover:border-black transition"
          />

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-black hover:border-black transition"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-black hover:border-black transition"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="cursor-pointer w-full bg-black text-white py-2.5 rounded-md hover:bg-gray-800 active:scale-95 transition duration-200 disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-black font-medium cursor-pointer hover:underline"
          >
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
