import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllFoods } from '../services/FoodServices';


function AdminFood() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllFoods()
      .then((response) => {
        console.log("Full API response:", response);
        console.log("Foods array:", response.data?.foods);
        setFoods(response.data?.foods || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching foods:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-4 pt-24 md:pt-32">
      <h2 className="text-2xl font-bold mb-4 mt-5 text-center">All Food Items</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foods.map((food) => (
          <div key={food._id} className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
            <img
              src={food.image || 'https://cdn-icons-png.flaticon.com/512/3570/3570168.png'} // default image
              alt={food.name}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h3 className="text-xl font-semibold mt-3">{food.name}</h3>
            <p className="text-gray-600 mt-1">{food.description}</p>
            <p className="text-sm text-gray-500 mt-1">🍽 Category: {food.category}</p>
            <p className="text-sm text-gray-500 mt-1">🏨 Restaurant: {food.restaurant?.name || 'N/A'}</p>
            <p className="text-sm text-gray-600 mt-1">💰 Price: ₹{food.price}</p>
            <p className="text-sm text-gray-400 mt-2">Created: {new Date(food.createdAt).toLocaleString()}</p>
            <div className="mt-4">
              <Link
                to={`/admin/foods/${food._id}`}
                className="text-blue-600 hover:underline"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminFood;