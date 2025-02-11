import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import useSeller from '../Hooks/isSeller/useSeller';

const sellerDashboard = () => {
  const [isSeller]=useSeller()
    return (
        <div className="flex">
        {/* Sidebar */}
        <div className="w-1/4 bg-cyan-500  text-white p-5">
          <h2 className="text-xl font-bold mb-4">Seller Dashboard</h2>
          <ul>
          {
            isSeller ? <>
            <li><Link to="/admin/users">Manage Users</Link></li>
            <li><Link to="/admin/categories">Manage Categories</Link></li>
            {/* <li><Link to="/admin/payments">Payment Management</Link></li> */}
            <li><Link to="/admin/salesReport">Sales Report</Link></li>
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

export default sellerDashboard;