import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userSignup } from '../services/UserServices';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { saveUser } from '../redux/features/userSlice';

function Signup() {
  const [values, setValues] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    userSignup(values)
      .then((res) => {
        dispatch(saveUser(res.data.saved));
        toast.success('Signup successful');
        navigate('/');
      })
      .catch((err) => {
        const message = err?.response?.data?.error || 'Something went wrong';
        toast.error(message);
      });
  };

  return (
<div className="min-h-full lg:min-h-screen flex flex-col lg:flex-row">
      {/* Left Form Side */}
      <div className="flex-1 flex items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">Create an Account</h2>
          <p className="text-sm text-gray-600">
            Join us and explore the authentic flavors of Kerala.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
            >
              Sign Up
            </button>

            <p className="text-sm text-center text-gray-600 mt-3">
              Already have an account?{' '}
              <Link to="/login" className="text-orange-500 hover:underline font-medium">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right Image Side */}
      <div
        className="hidden lg:flex flex-1 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://cdn.pixabay.com/photo/2017/12/10/14/47/pizza-3010062_1280.jpg')`,
        }}
      ></div>
    </div>
  );
}

export default Signup;
