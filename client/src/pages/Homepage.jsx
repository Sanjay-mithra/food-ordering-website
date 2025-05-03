  import React, { useEffect, useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import Banner from '../components/Banner';
  import FoodCard from '../components/FoodCard';
  import { getAllFoods } from '../services/FoodServices';
  import { listAllRestaurants } from '../services/RestaurantServices';

  function Homepage() {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRestaurant, setSelectedRestaurant] = useState('');
    const [restaurants, setRestaurants] = useState([]);

    const navigate = useNavigate();

    const menu = [
      { name: 'Biryani', image: 'https://www.biriyanizone.com/images/763x848_img1.png' },
      { name: 'Shawarma', image: 'https://foxeslovelemons.com/wp-content/uploads/2023/06/Chicken-Shawarma-8.jpg' },
      { name: 'Burger', image: 'https://www.thecookierookie.com/wp-content/uploads/2023/04/featured-stovetop-burgers-recipe.jpg' },
      { name: 'Parotta', image: 'https://kj1bcdn.b-cdn.net/media/81875/malabar-paratha.jpg' },
      { name: 'Falooda', image: 'https://www.archanaskitchen.com/images/archanaskitchen/1-Author/swathynandhini/KESAR_PISTA_FALOODA.jpg' },
      { name: 'Pizza', image: 'https://septemberfarmcheese.b-cdn.net/wp-content/uploads/Blogs/Homemade-Pizza/homemade-pizza-monterey-jack-cheese.jpg' },
      { name: 'Iceacream', image: 'https://cdn.britannica.com/50/80550-050-5D392AC7/Scoops-kinds-ice-cream.jpg' },
      { name: 'Mojito', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWgYQViQYq4evBuCMFq2Gwt-9MUJxgeZzVgg&s' },
    ];

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const resRestaurants = await listAllRestaurants();
          const allRestaurants = resRestaurants?.data?.restaurants || [];
          setRestaurants([{ _id: '', name: 'All Restaurants' }, ...allRestaurants]);

          const resFoods = await getAllFoods();
          setFoods(resFoods?.data?.foods || []);
        } catch (err) {
          console.error("Error fetching data:", err);
          setFoods([]);
          setRestaurants([]);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, []);

    return (
      <div className="mt-5">
        <Banner />

        {/* Menu Items Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <h2 className="text-3xl font-bold text-gray-800 px-5 mx-2 text-center sm:text-left w-full sm:w-auto">Menu Items</h2>
            <div className="relative w-full sm:w-64">
              <select
                value={selectedRestaurant}
                onChange={(e) => {
                  const selectedId = e.target.value;
                  setSelectedRestaurant(selectedId);
                  if (selectedId) {
                    navigate(`/restaurant/${selectedId}`);
                  }
                }}
                className="w-full appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-10 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
              >
                {restaurants.map((restaurant, index) => (
                  <option key={index} value={restaurant._id}>
                    {restaurant.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {menu.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <img
                  className="mask mask-circle w-24 h-24 object-cover"
                  src={item.image}
                  alt={item.name}
                />
                <p className="text-sm text-center mt-2">{item.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Food Items Section */}
        <div className="max-w-7xl mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center min-h-[70vh]">
              <div className="w-10 h-10 border-t-4 border-orange-500 border-solid rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {foods.length > 0 ? (
                foods.map((food) => (
                  <FoodCard key={food._id} food={food} />
                ))
              ) : (
                <p className="text-center text-gray-500 mt-5 col-span-full">
                  No foods available.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  export default Homepage;
