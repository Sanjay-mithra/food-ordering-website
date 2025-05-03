import React, { useState } from 'react';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLogout } from '../services/UserServices';
import { persistor } from '../redux/store';
import { clearUser } from '../redux/features/userSlice';
import { toast } from 'react-toastify';

function Header() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user);
  const [showOptions, setShowOptions] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    userLogout()
      .then(() => {
        persistor.purge();
        dispatch(clearUser());
        navigate('/');
        toast.success('Logout successful', { position: 'top-center' });
      })
      .catch((error) => {
        console.log(error);
        const message = error?.response?.data?.error || 'Something went wrong';
        toast.error(message, { position: 'top-center' });
      });
  };

  return (
    <header className="sticky top-0 bg-base-100 shadow-sm px-4 py-2 w-full z-50">
      <div className="flex flex-wrap items-center justify-between max-w-7xl mx-auto">

        {/* Logo & Hamburger */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between">
          <img
            src="/Site logo/Kerala's Kitchen.png"
            alt="Kerala's Kitchen Logo"
            className="w-40 h-16 object-contain"
          />
          <button className="sm:hidden text-2xl text-orange-500" onClick={() => setMenuOpen(true)}>
            <FaBars />
          </button>
        </div>

        {/* Quote */}
        <div className="hidden sm:flex flex-1 justify-center items-center gap-4">
          <p className="text-sm font-medium text-gray-700 text-center">
            "Good food makes every vacation better."
          </p>
          <img
            src="https://thumbs.dreamstime.com/b/boys-girls-eating-fast-food-boy-pizza-girl-drinking-soda-burger-cake-188863009.jpg"
            alt="Vacation Food"
            className="w-28 h-16 object-contain"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center gap-4">
          <div className="flex gap-6 items-center">
            {/* Home */}
            <div className="flex flex-col items-center text-orange-500 hover:text-orange-600 cursor-pointer w-12" onClick={() => navigate('/')}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z" />
                <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z" />
              </svg>
              <span className="text-xs font-medium mt-1">Home</span>
            </div>

            {userData.user && Object.keys(userData.user).length > 0 ? (
              <>

                {/* Cart */}
                <div className="flex flex-col items-center text-orange-500 hover:text-orange-600 cursor-pointer w-12" onClick={() => navigate('/cartpage')}>
                  <FaShoppingCart className="w-6 h-6" />
                  <span className="text-xs font-medium mt-1">Cart</span>
                </div>

                {/* Profile */}
                <div className="relative">
  <div
    className="flex flex-col items-center text-orange-500 hover:text-orange-600 cursor-pointer w-12"
    onClick={() => setShowOptions(prev => !prev)}
  >
    <img
      src={userData.user.profilePic}
      alt="User Avatar"
      className="w-6 h-6 rounded-full hover:scale-105 transition duration-200"
    />
    <span className="text-xs font-medium mt-1">{userData.user.name}</span>
  </div>

  {showOptions && (
    <div className="absolute z-50 mt-2 right-0 bg-white border rounded-md shadow-md w-36">
      <button
        onClick={() => {
          handleLogout();
          setShowOptions(false);
        }}
        className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-orange-100"
      >
        Logout
      </button>
    </div>
  )}
</div>

              </>
            ) : (
              <span className="btn !rounded-full px-6 py-2 border-none text-sm" onClick={() => navigate('/signup')}>
                Sign Up
              </span>
            )}
          </div>
        </nav>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 flex justify-end">
          <button className="text-xl" onClick={() => setMenuOpen(false)}>
            <FaTimes />
          </button>
        </div>
        <div className="flex flex-col items-start gap-4 px-6">
          <span className="text-orange-500 cursor-pointer" onClick={() => { navigate('/'); setMenuOpen(false); }}>Home</span>
          {userData.user && Object.keys(userData.user).length > 0 ? (
            <>
              <span className="text-orange-500 cursor-pointer" onClick={() => { navigate('/cartpage'); setMenuOpen(false); }}>Cart</span>
              <span className="text-red-500 cursor-pointer" onClick={() => { handleLogout(); setMenuOpen(false); }}>Logout</span>
            </>
          ) : (
            <span className="text-orange-500 cursor-pointer" onClick={() => { navigate('/signup'); setMenuOpen(false); }}>Sign Up</span>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
