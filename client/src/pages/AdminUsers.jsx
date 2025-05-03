import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listAllUsers } from '../services/AdminServices';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listAllUsers()
      .then((response) => {
        console.log("Users response:", response);
        setUsers(response.data?.users || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-4 pt-24 md:pt-32">
      <h2 className="text-2xl font-bold mb-4 mt-5 text-center">All Users</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div key={user._id} className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
            <h3 className="text-xl font-semibold">{user.name}</h3>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-500">Role: {user.role}</p>
            <p className="text-sm text-gray-400 mt-2">Joined: {new Date(user.createdAt).toLocaleString()}</p>
            <div className="mt-4">
              <Link
                to={`/admin/users/${user._id}`}
                className="text-blue-600 hover:underline"
              >
                View Profile
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminUsers;
