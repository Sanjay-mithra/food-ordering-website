import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import CartCard from "../components/CartCard";
import { getCartItems } from "../services/CartServices";

export default function Cartpage() {
  const [CartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const removeCartItemFromCartPage = (foodId) => {
    setCartItems((prev) =>
      prev.filter((item) => item.foodId && item.foodId._id !== foodId)
    );
  };

  const updateCartItemQuantityFromCartPage = (updatedItem) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.foodId && item.foodId._id === updatedItem.foodId._id
          ? { ...item, quantity: updatedItem.quantity }
          : item
      )
    );
  };

  useEffect(() => {
    getCartItems()
      .then((res) => {
        setCartItems(res.data.foods || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cart:", error?.response?.data || error.message);
        setLoading(false);
      });
  }, []);

  const handleProceedToCheckout = () => {
    if (CartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    navigate("/checkout", { state: { cartItems: CartItems } });
  };

  const hasValidItems = CartItems.filter((item) => item.foodId).length > 0;

  return (
    <div className="min-h-screen px-4 sm:px-6 py-6 bg-gray-100">
      {hasValidItems && (
        <>
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 text-center">
            My Cart Items
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
            {CartItems.filter((item) => item.foodId).map((item) => (
              <CartCard
                key={item.foodId._id}
                item={item}
                removeCartItem={removeCartItemFromCartPage}
                updateCartItemQuantity={updateCartItemQuantityFromCartPage}
              />
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={handleProceedToCheckout}
              className="bg-orange-500 text-white px-6 py-2 rounded-md text-lg font-semibold hover:bg-orange-600 transition w-full sm:w-auto"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}

      {!hasValidItems && !loading && (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-illustration-download-in-svg-png-gif-file-formats--no-items-added-web-app-page-bucket-state-pack-design-development-illustrations-3016826.png?f=webp"
            alt="Empty Cart"
            className="w-48 sm:w-64 h-auto mb-4 object-cover"
          />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-700">Your Cart is Empty</h2>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Looks like you haven't added any delicious meals yet!
          </p>
          <Link
            to="/"
            className="mt-6 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full no-underline"
          >
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
}
