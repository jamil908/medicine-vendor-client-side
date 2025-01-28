import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import useAdmin from '../../Hooks/isAdmin/useAdmin';

const AdminDashboard = () => {
  const [isAdmin]=useAdmin()
    return (
        <div className="flex">
        {/* Sidebar */}
        <div className="w-1/4 bg-gray-200 p-5">
          <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
          <ul>
          {
            isAdmin ? <>
            <li><Link to="/admin/users">Manage Users</Link></li>
            <li><Link to="/admin/categories">Manage Categories</Link></li>
            <li><Link to="/admin/payments">Payment Management</Link></li>
            <li><Link to="/">Home</Link></li></>:<><Link to="/">Home</Link></>
          }
          </ul>
        </div>
  
        {/* Main Content */}
        <div className="w-3/4 p-5">
          <Outlet />
        </div>
      </div>
    );
};

export default AdminDashboard;