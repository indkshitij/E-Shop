import React, { useContext, useEffect } from "react";
import { AppContext } from "../Context/AppContext";
import OrderCard from "../atoms/OrderCard";

const OrdersPage = () => {
  const { orders, fetchOrders, loadingOrders } = useContext(AppContext);

  useEffect(() => {
    fetchOrders();
    document.title = "Order | E-Shop";
  

  }, []);

  return (
    <div className="px-4 md:px-8 lg:px-16 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">My Orders</h1>

      {loadingOrders ? (
        <p className="text-center text-gray-500">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500">You have no orders yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
