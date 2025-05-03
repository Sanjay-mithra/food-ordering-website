import React, { useState } from 'react';

const FoodDetails = ({ food }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="max-w-md mx-auto bg-white shadow-xl rounded-2xl overflow-hidden font-poppins">
      <img src={food.image} alt={food.name} className="w-full h-56 object-cover" />
      <div className="p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Burger</h2>
          <span className="text-lg text-green-600 font-semibold">₹{food.price}</span>
        </div>
        <p className="text-sm text-gray-500 mt-2">{food.shortDescription}</p>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="mt-4 text-warning font-medium hover:underline"
        >
          {showDetails ? 'Hide Details' : 'View Details'}
        </button>

        {showDetails && (
          <div className="mt-4 text-gray-700 text-sm space-y-2">
            <p><strong>Ingredients:</strong> {food.ingredients.join(', ')}</p>
            <p><strong>Spice Level:</strong> {food.spiceLevel}</p>
            <p><strong>Category:</strong> {food.category}</p>
            <p><strong>Description:</strong> {food.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodDetails;
