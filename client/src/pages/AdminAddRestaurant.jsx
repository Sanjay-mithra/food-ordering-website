import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addRestaurant } from '../services/AdminServices';

function AdminAddRestaurant() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await addRestaurant(formData);
      navigate('/admin/allrestaurants');
      toast.success('Restaurant added successfully!');
    } catch (err) {
      console.error('Submit failed:', err);
      setError(err.response?.data?.message || 'Failed to add restaurant');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-5 text-center">Add New Restaurant</h2>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
          <input
            type="text"
            name="name"
            placeholder="Restaurant Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded mb-4 "
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded mb-4 "
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded mb-4 "
          />

<input
  type="email"
  name="email"
  placeholder="Seller Email"
  value={formData.email}
  onChange={handleChange}
  required
  className="w-full border border-gray-300 p-2 rounded mb-4"/>

<input
  type="password"
  name="password"
  placeholder="Seller Password"
  value={formData.password}
  onChange={handleChange}
  required
  className="w-full border border-gray-300 p-2 rounded mb-4"
/>


          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Add Restaurant
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminAddRestaurant;
