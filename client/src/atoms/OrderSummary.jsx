import CheckoutForm from "./CheckoutForm";

const OrderSummary = ({ total }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow h-fit">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      <div className="flex justify-between mb-2">
        <span>Total:</span>
        <span className="font-semibold">₹ {total}</span>
      </div>
      <CheckoutForm total={total} />
    </div>
  );
};

export default OrderSummary;
