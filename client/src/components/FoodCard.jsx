import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { addToCart } from '../services/CartServices';

function FoodCard({ food }) {
  const [isLoading, setIsLoading] = useState(false);

  const addFoodToCart = (foodId) => {
    setIsLoading(true);
    addToCart(foodId, 1)
      .then((res) => {
        const message = res?.data?.message || "Food added to cart";
        toast.success(message, { position: 'top-center' });
      })
      .catch((err) => {
        const errorMessage = err?.response?.data?.error || "Something went wrong";
        toast.warning(errorMessage, { position: 'top-center' });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (!food || !food.name || !food.image || !food.price) {
    return null;
  }

  return (
    <div className="card bg-base-100 w-full max-w-sm shadow-sm mt-5 flex flex-col h-[380px] sm:h-[420px]">
      <figure className="flex-shrink-0 overflow-hidden">
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-44 sm:h-52 object-cover"
        />
      </figure>

      <div className="card-body flex-grow flex flex-col">
        <h2 className="card-title text-lg">{food.name}</h2>
        <p className="flex-grow text-sm text-gray-700">
          {food.description?.slice(0, 50)}
          {food.description?.length > 50 ? "..." : ""}
        </p>
        {/* Restaurant info removed */}
        <div className="mt-auto card-actions flex flex-col sm:flex-row justify-between items-center">
          <p className="text-lg font-semibold text-gray-800 mb-2 sm:mb-0">
            ₹ {food.price}
          </p>
          <button
            className="btn !bg-orange-500 !text-white hover:!bg-orange-600 border-none w-full sm:w-auto"
            onClick={() => addFoodToCart(food._id)}
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
