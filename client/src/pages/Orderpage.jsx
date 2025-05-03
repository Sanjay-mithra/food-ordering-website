import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { myOrders } from '../services/orderServices';

function Orderpage() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await myOrders();
        setOrders(res.data.orders);
      } catch (err) {
        console.error("Error fetching orders", err);
      }
    };

    fetchOrders();
  }, []);


  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center px-4">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
          alt="No Orders"
          className="w-32 h-32 mb-4"
        />
        <h2 className="text-xl font-semibold text-gray-700 mb-2">You haven't placed any orders yet!</h2>
        <p className="text-sm text-gray-500 mb-4">Go back to cart and start ordering your favorite food.</p>
        <button
          onClick={() => navigate('/cartpage')}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Go to Cart
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 md:px-10">
      <h1 className="text-3xl font-bold text-orange-600 text-center mb-5">My Orders</h1>

      <div className="space-y-6 max-w-4xl mx-auto">
        {orders.map((order, index) => (
          <div key={index} className="bg-white shadow-lg rounded-xl p-6 flex flex-col md:flex-row gap-6 items-center transition hover:shadow-xl">
            <img
              src={order.items[0].food.image}
              alt={order.items[0].food.name}
              className="w-32 h-32 rounded-xl object-cover border border-gray-200"
            />
            <div className="flex-1 w-full">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3">
                <h2 className="text-xl font-bold text-gray-800">{order.items[0].food.name}</h2>
                <span className="text-sm font-semibold bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  {order.status}
                </span>
              </div>

              <div className="text-sm text-gray-600 space-y-1">
                <p>Quantity: <span className="font-semibold text-gray-800">{order.items[0].quantity}</span></p>
                <p>Total Price: <span className="font-semibold text-gray-800">₹{order.totalPrice}</span></p>
                <p>Order Date: <span className="text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</span></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orderpage;
