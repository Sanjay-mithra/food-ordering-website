import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import { makePaymentOnStripe } from "../services/paymentServices";

const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY_STRIPE);

export default function CheckoutPage() {
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];
  console.log("Checkout cart items:", cartItems);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
    paymentMethod: "Card",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const makePayment = async (e) => {
    e.preventDefault();

    const validCartItems = cartItems.filter(
      (item) =>
        item?.foodId &&
        item.foodId.name &&
        item.foodId.image &&
        typeof item.foodId.price === "number" &&
        typeof item.quantity === "number"
    );

    if (validCartItems.length === 0) {
      alert("No valid items in cart.");
      return;
    }

    const body = { products: validCartItems };
    console.log("Sending valid cart items to backend: ", validCartItems);

    try {
      const response = await makePaymentOnStripe(body);
      const session = response.data.sessionId;

      if (!session) {
        console.error("Session ID is missing.");
        return;
      }

      const stripe = await stripePromise;
      const result = await stripe.redirectToCheckout({ sessionId: session });

      if (result.error) {
        console.log(result.error.message);
      }
    } catch (err) {
      console.error("Payment error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-4 overflow-y-auto">
  <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-6 sm:gap-10">
    
    {/* Image Section */}
    <div className="w-full lg:w-1/2 flex justify-center">
      <img
        src="https://static.vecteezy.com/system/resources/previews/028/130/625/non_2x/delivery-man-holding-a-package-with-a-phone-call-asking-for-the-address-vector.jpg"
        alt="Delivery"
        className="w-full h-auto max-h-[250px] sm:max-h-[300px] md:max-h-[350px] object-contain rounded-lg"
      />
    </div>

    {/* Form Section */}
    <div className="w-full lg:w-1/2">
      <form className="space-y-4 sm:space-y-5" onSubmit={makePayment}>
        <div className="bg-gray-50 rounded-lg p-4 sm:p-5 border border-gray-200">
          <h3 className="text-base sm:text-lg font-semibold mb-4 text-black">Add Delivery Address</h3>

          {/* Full Name */}
          <div className="mb-3">
            <label className="block text-orange-500 text-sm mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Full Name"
              className="w-full border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Address */}
          <div className="mb-3">
            <label className="block text-orange-500 text-sm mb-1">Address</label>
            <textarea
              name="address"
              rows="2"
              placeholder="Enter Address"
              className="w-full border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              value={formData.address}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* City & Postal Code */}
          <div className="flex flex-col sm:flex-row gap-4 mb-3">
            <div className="flex-1">
              <label className="block text-orange-500 text-sm mb-1">City</label>
              <input
                type="text"
                name="city"
                placeholder="City"
                className="w-full border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex-1">
              <label className="block text-orange-500 text-sm mb-1">Postal Code</label>
              <input
                type="text"
                name="postalCode"
                placeholder="123456"
                className="w-full border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                value={formData.postalCode}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-orange-500 text-sm mb-1">Phone Number</label>
            <input
              type="text"
              name="phone"
              placeholder="+91 9876543210"
              className="w-full border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 text-sm font-medium transition"
        >
          Place Order
        </button>
      </form>
    </div>
  </div>
</div>

  );
}
