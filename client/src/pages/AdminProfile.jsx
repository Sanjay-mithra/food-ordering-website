import { useEffect, useState } from 'react';
import { getAdminProfile } from '../services/AdminServices';

function AdminProfile() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminProfile()
      .then((response) => {
        setAdmin(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch admin profile:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (!admin) return <p className="text-center mt-10 text-red-500">Admin not found</p>;

  return (
    <div className="max-w-md mx-auto mt-24 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Admin Profile</h2>
      <p><strong>Name:</strong> {admin.name}</p>
      <p><strong>Email:</strong> {admin.email}</p>
      <p><strong>Role:</strong> {admin.role}</p>
    </div>
  );
}

export default AdminProfile;
