import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clearCartItems } from "../services/CartServices";

function PaymentSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    clearCartItems()
      .then((res) => {
        console.log("Cart cleared:", res);
      })
      .catch((err) => {
        console.error("Error clearing cart:", err);
      });
  }, []);

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 py-8 text-center">
      <img
        src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
        alt="Success"
        className="w-24 h-24 mb-6"
      />
      <h1 className="text-3xl font-bold text-green-600 mb-2">Payment Successful!</h1>
      <p className="text-lg text-gray-700 mb-6">
        Thank you for your order! We're preparing your delicious food.
      </p>
      <button
        onClick={handleGoHome}
        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md text-sm font-medium transition duration-200"
      >
        Back to Home
      </button>
    </div>
  );
}

export default PaymentSuccess;
