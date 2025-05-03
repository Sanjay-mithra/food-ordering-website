import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFoodsByRestaurant } from '../services/FoodServices';
import FoodCard from '../components/FoodCard';

function RestaurantFoods() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [restaurantName, setRestaurantName] = useState('');

useEffect(() => {
  const fetchFoods = async () => {
    setLoading(true);
    try {
      const res = await getFoodsByRestaurant(id);
      setFoods(res?.foods || []);
    } catch (err) {
      console.error('Error fetching foods:', err);
      setFoods([]);
    } finally {
      setLoading(false);
    }
  };

  if (id) fetchFoods();
}, [id]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/')}
          className="text-orange-500 hover:underline text-sm"
        >
          ← Back to Homepage
        </button>
      </div>

      {/* Title */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        {restaurantName ? `${restaurantName} Menu` : 'Restaurant Menu'}
      </h2>

      {/* Food List */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="w-10 h-10 border-t-4 border-orange-500 border-solid rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {foods.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {foods.map((food) => (
                <FoodCard key={food._id} food={food} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-10">No foods available for this restaurant.</p>
          )}
        </>
      )}
    </div>
  );
}

export default RestaurantFoods;
