// src/pages/AdminDashboard.jsx
import React from 'react';
import { FiHome, FiBox, FiShoppingCart, FiPlus } from 'react-icons/fi';

function AdminDashboard() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-red-800 text-white p-4 space-y-6">
        <h1 className="text-2xl font-bold">Taaza</h1>
        <nav className="flex flex-col space-y-4">
          <a href="#" className="flex items-center space-x-2 hover:text-yellow-300">
            <FiHome /> <span>Dashboard</span>
          </a>
          <a href="#" className="flex items-center space-x-2 hover:text-yellow-300">
            <FiBox /> <span>Products</span>
          </a>
          <a href="#" className="flex items-center space-x-2 hover:text-yellow-300">
            <FiShoppingCart /> <span>Orders</span>
          </a>
          <a href="#" className="flex items-center space-x-2 hover:text-yellow-300">
            <FiPlus /> <span>Add Product</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <h2 className="text-3xl font-semibold mb-4">Dashboard</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-medium">Total Orders</h3>
            <p className="text-2xl font-bold text-red-700">120</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-medium">Revenue</h3>
            <p className="text-2xl font-bold text-green-600">₹45,000</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-medium">Stock Left</h3>
            <p className="text-2xl font-bold text-yellow-600">320 kg</p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-2">Recent Orders</h2>
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full table-auto">
            <thead className="bg-red-100">
              <tr>
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">Customer</th>
                <th className="px-4 py-2">Item</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center">
                <td className="px-4 py-2">#001</td>
                <td className="px-4 py-2">Rahul</td>
                <td className="px-4 py-2">Boneless Chicken</td>
                <td className="px-4 py-2">₹350</td>
                <td className="px-4 py-2 text-green-500">Delivered</td>
              </tr>
              <tr className="text-center">
                <td className="px-4 py-2">#002</td>
                <td className="px-4 py-2">Sneha</td>
                <td className="px-4 py-2">Chicken Legs</td>
                <td className="px-4 py-2">₹220</td>
                <td className="px-4 py-2 text-yellow-500">Pending</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
