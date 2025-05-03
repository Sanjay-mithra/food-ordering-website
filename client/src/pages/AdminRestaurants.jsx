import { useEffect, useState } from 'react';
import { listAllRestaurants, deleteRestaurant } from '../services/RestaurantServices';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function AdminRestaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await listAllRestaurants();
      setRestaurants(response.data?.restaurants || []);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this restaurant?")) return;
    try {
      await deleteRestaurant(id);
      setRestaurants((prev) => prev.filter((restaurant) => restaurant._id !== id));
      toast.success('Restaurant deleted successfully');
    } catch (error) {
      console.error('Error deleting restaurant:', error);
      toast.error('Failed to delete restaurant');
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-4 pt-24 md:pt-32">
      <h2 className="text-2xl font-bold mb-4 mt-5 text-center">All Restaurants</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <div key={restaurant._id} className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
            <img
              src={restaurant.image || 'https://static.vecteezy.com/ti/vecteur-libre/p1/17722096-cuisine-cuisine-logo-de-cuisine-restaurant-menu-cafe-creation-de-logo-d-etiquette-de-restaurant-illustrationle-gratuit-vectoriel.jpg'}
              alt={restaurant.name}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h3 className="text-xl font-semibold mt-3">{restaurant.name}</h3>
            <p className="text-gray-600 mt-1">{restaurant.description}</p>
            <p className="text-sm text-gray-500 mt-1">📍 {restaurant.location}</p>
            <p className="text-sm text-gray-400 mt-2">Created: {new Date(restaurant.createdAt).toLocaleString()}</p>
            <div className="mt-4 flex justify-between">
              <Link
                to={`/admin/restaurants/${restaurant._id}`}
                className="text-blue-600 hover:underline"
              >
                View Details
              </Link>
              <button
                onClick={() => handleDelete(restaurant._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminRestaurants;
