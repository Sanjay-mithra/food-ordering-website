import { useEffect, useState } from "react";
import { getAdminDashboardStats } from "../services/AdminServices";
import { FaUtensils, FaPizzaSlice, FaUsers, FaShoppingCart } from "react-icons/fa";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getAdminDashboardStats()
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Error fetching stats:", err));
  }, []);

  if (!stats) return <p className="text-center mt-10 text-lg">Loading...</p>;

  return (
    <div className="mt-20 px-4 space-y-10">
      {/* Heading */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-orange-500 !text-orange-500">Kerala's Kitchen</h1>
        <p className="text-gray-500 mt-2">Admin Dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Restaurants" value={stats.restaurants} color="bg-blue-500" Icon={FaUtensils} />
        <StatCard label="Foods" value={stats.foods} color="bg-green-500" Icon={FaPizzaSlice} />
        <StatCard label="Users" value={stats.users} color="bg-purple-500" Icon={FaUsers} />
        <StatCard label="Orders" value={stats.orders} color="bg-yellow-500" Icon={FaShoppingCart} />
      </div>
    </div>
  );
}

function StatCard({ label, value, color, Icon }) {
  return (
    <div className="bg-white shadow rounded-lg p-5 flex items-center space-x-4 hover:shadow-md transition-shadow">
      <div className={`text-white p-4 rounded-full text-xl ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-gray-600">{label}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>
    </div>
  );
}
