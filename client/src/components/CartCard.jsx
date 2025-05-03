import React, { useEffect, useState } from 'react';
import { removeCartItems } from '../services/CartServices';
import { toast } from 'react-toastify';

function CartCard({ item, removeCartItem, updateCartItemQuantity }) {
  const [quantity, setQuantity] = useState(item.quantity || 1)
  const pricePerItem = item.foodId.price;
  const totalPrice = quantity * pricePerItem;

  const increment = () => {
    const updatedQuantity = quantity + 1;
    setQuantity(updatedQuantity);
    updateCartItemQuantity({ ...item, quantity: updatedQuantity });
  };
  
  const decrement = () => {
    if (quantity > 1) {
      const updatedQuantity = quantity - 1;
      setQuantity(updatedQuantity);
      updateCartItemQuantity({ ...item, quantity: updatedQuantity });
    }
  };
  

  const removeItem = (foodId) => {
    try {
      removeCartItems(foodId)
        .then((res) => {
          removeCartItem(foodId);
          const message = res?.data?.message || "Food removed from cart";
          toast.success(message, { position: 'top-center' });
        })
        .catch((err) => {
          toast.warning(err.response?.data?.error || "Error", { position: 'top-center' });
        });
    } catch (error) {
      const message = error?.response?.data?.error || "Something went wrong";
      toast.error(message, { position: 'top-center' });
    }
  };

  useEffect(() => {
    setQuantity(item.quantity || 1);
  }, [item.quantity]);

  return (
    <div className="bg-white rounded-xl shadow-md w-full max-w-md mx-auto flex flex-col overflow-hidden">
      <div className="h-56 w-full overflow-hidden">
        <img
          src={item.foodId.image}
          alt={item.foodId.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col p-4">
        <div className="text-center mb-2">
          <h2 className="text-lg font-semibold text-gray-900 truncate">{item.foodId.name}</h2>
          <div className="flex justify-center gap-4 mt-1">
            <p className="text-orange-600 font-bold">Price: ₹{pricePerItem}/-</p>
            <p className="text-gray-500 text-sm">Total: ₹{totalPrice}/-</p>
          </div>
        </div>

        {/* Centered quantity and remove button */}
        <div className="flex justify-center items-center gap-6 mt-3">
          <div className="flex items-center gap-3">
            <button
              onClick={decrement}
              className="bg-orange-500 text-white rounded-full !rounded-full w-7 h-7 text-lg flex items-center justify-center hover:bg-orange-600"
            >
              -
            </button>
            <span className="text-base font-medium text-gray-800">{quantity}</span>
            <button
              onClick={increment}
              className="bg-orange-500 text-white rounded-full !rounded-full w-7 h-7 text-lg flex items-center justify-center hover:bg-orange-600"
            >
              +
            </button>
          </div>

          <button
            className="bg-red-600 text-white px-4 py-1 rounded-full !rounded-full text-sm font-medium hover:bg-red-700 transition"
            onClick={() => removeItem(item.foodId._id)}
          >
            Remove From Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartCard;
