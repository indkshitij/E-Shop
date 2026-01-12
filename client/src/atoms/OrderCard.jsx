
import { FaCheckCircle, FaClock } from "react-icons/fa";

const OrderCard = ({ order }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 p-6 w-full mx-auto">
      
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">
          Order <span className="text-gray-500">#{order._id.slice(-6).toUpperCase()}</span>
        </h3>

        <span
          className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-semibold ${
            order.isPaid
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {order.isPaid ? <FaCheckCircle /> : <FaClock />}
          <span>{order.isPaid ? "Paid" : "Pending"}</span>
        </span>
      </div>

      <div className="space-y-3 max-h-56 overflow-y-auto pr-2">
        {order.products.map((item) => (
          <div
            key={item.product._id}
            className="flex justify-between items-center border-b pb-2 last:border-none"
          >
            <div className="flex items-center space-x-3">
              <img
                src={item.product.imageUrl}
                alt={item.product.productName}
                className="w-14 h-14 object-cover rounded-lg"
              />
              <div>
                <h4 className="text-sm font-medium text-gray-700 truncate max-w-[150px]">
                  {item.product.productName}
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">Qty: {item.quantity}</p>
              </div>
            </div>
            <span className="text-sm font-semibold text-gray-800">
              ₹ {item.product.price * item.quantity}
            </span>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200">
        <span className="text-gray-600 font-medium">Total:</span>
        <span className="text-gray-900 font-bold text-lg">₹ {order.totalAmount}</span>
      </div>

    </div>
  );
};

export default OrderCard;
