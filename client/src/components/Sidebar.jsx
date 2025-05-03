import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaStore,
  FaUtensils,
  FaUsers,
  FaPlus,
  FaSignOutAlt,
  FaBars,
  FaUserShield,
} from "react-icons/fa";

import { adminLogout } from "../services/AdminServices";
import { clearAdminInfo } from "../redux/features/AdminSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { persistor } from "../redux/store";
import { clearUser } from "../redux/features/userSlice";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate()
    const handleLogout = () => {
      try {
        adminLogout().then((res) => {
          persistor.purge();
          dispatch(clearAdminInfo());
          dispatch(clearUser());
          navigate('/');
          toast.success('Logout successful', {
            position: 'top-center',
          });
        }).catch((error) => {
          console.log(error);
        });
      } catch (error) {
        console.log(error);
        const message =
          error?.response?.data?.error || 'Something went wrong';
        toast.error(message, {
          position: 'top-center',
        });
      }
    };

  const linkStyle = ({ isActive }) =>
    isActive
      ? "flex items-center space-x-2 p-2 bg-orange-500 text-white rounded !no-underline"
      : "flex items-center space-x-2 p-2 hover:bg-orange-600 text-white rounded transition !no-underline";

  return (
    <>
      {/* Top Navbar - visible on all screens */}
      {!isOpen && (
        <div className="flex items-center justify-between bg-white text-gray-800 p-4 shadow-md md:ml-64 fixed w-full z-50 top-0 md:flex">
          <div className="text-xl font-bold">Admin Panel</div>
          <button className="md:hidden text-xl" onClick={() => setIsOpen(true)}>
            <FaBars />
          </button>
        </div>
      )}

      {/* Sidebar Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed z-50 top-0 left-0 h-full w-64 bg-orange-500 text-white flex flex-col p-4 pt-20 transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:h-screen md:pt-24`}
      >
        <nav className="flex-1">
          <ul className="space-y-4">
            <li>
              <NavLink to="/admin" className={linkStyle} onClick={() => setIsOpen(false)}>
                <FaHome />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/allrestaurants" className={linkStyle}>
                <FaStore />
                <span>Restaurants</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/addrestaurant" className={linkStyle} onClick={() => setIsOpen(false)}>
                <FaPlus />
                <span>Add Restaurant</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/foods" className={linkStyle} onClick={() => setIsOpen(false)}>
                <FaUtensils />
                <span>Foods</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/listallusers" className={linkStyle} onClick={() => setIsOpen(false)}>
                <FaUsers />
                <span>Users</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/profile" className={linkStyle} onClick={() => setIsOpen(false)}>
                <FaUserShield />
                <span>Admin</span>
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Logout Button */}
        <button
  onClick={() => {
    handleLogout();
    localStorage.removeItem("adminToken");
  }}
  className="mt-8 flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition"
>
  <FaSignOutAlt />
  <span>Logout</span>
</button>

      </div>

      {/* Spacer to push content below navbar */}
      <div className="h-16 md:h-24" />
    </>
  );
}
