import { Link } from "react-router-dom";

export default function CheckoutSuccess() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h2 className="text-3xl font-bold mb-4">Checkout Successful!</h2>
      <p className="text-gray-500 mb-6">Thank you for your purchase.</p>
      <Link to="/">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Continue Shopping
        </button>
      </Link>
    </div>
  );
}
