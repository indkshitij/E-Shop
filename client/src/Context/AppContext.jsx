import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  // product
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  // cart
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [loadingCart, setLoadingCart] = useState(false);

  // order
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  // fetch cart
  const fetchCartItems = async () => {
    if (!token) return;

    try {
      setLoadingCart(true);

      const res = await axios.get(`${BASE_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      setCartItems(res.data.cartItems || []);
      setCartCount(res.data.cartItems?.length || 0);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch cart");
    } finally {
      setLoadingCart(false);
    }
  };

  // add to cart
  const addToCart = async (productId) => {
    if (!token) {
      toast.error("Please login first");
      return;
    }

    try {
      await axios.post(
        `${BASE_URL}/cart/add`,
        { id: productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Item added to cart");
      fetchCartItems();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add item");
    }
  };

  // remove frm cart
  const removeFromCart = async (productId) => {
    if (!token) return;

    try {
      await axios.post(
        `${BASE_URL}/cart/remove`,
        { id: productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Item removed");
      fetchCartItems();
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove item");
    }
  };

  //   fetch all products
  const getProducts = async () => {
    try {
      setLoadingProducts(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(`${BASE_URL}/products/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setProducts(res.data.products);
      }
      console.log(res);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error(error.response?.data?.message || "Failed to fetch products");
    } finally {
      setLoadingProducts(false);
    }
  };

  const getProductById = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${BASE_URL}/products/product-detail/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        return res.data.product;
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error(error.response?.data?.message || "Failed to fetch product");
    }
  };

  // Create a new order
  const createOrder = async (orderData) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${BASE_URL}/orders/create`, orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        toast.success(res.data.message);
        return res.data;
      }
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error(error.response?.data?.message || "Failed to create order");
      return null;
    }
  };

  // mark an order as paid
  const markOrderPaid = async (paymentIntentId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${BASE_URL}/orders/paid`,
        { paymentIntentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        return res.data.order;
      }
    } catch (error) {
      console.error("Error marking order paid:", error);
      toast.error(error.response?.data?.message || "Failed to mark order paid");
      return null;
    }
  };

  // fetch all orders
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${BASE_URL}/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setOrders(res.data.orders || []);
        return res.data.orders;
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error(error.response?.data?.message || "Failed to fetch orders");
      return [];
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [token]);

  return (
    <AppContext.Provider
      value={{
        cartItems,
        cartCount,
        loadingCart,
        fetchCartItems,
        addToCart,
        removeFromCart,

        products,
        getProducts,
        getProductById,

        createOrder,
        markOrderPaid,
        fetchOrders,
        orders,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
