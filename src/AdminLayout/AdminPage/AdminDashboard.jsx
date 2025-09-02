import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import useAdmin from '../../Hooks/isAdmin/useAdmin';

const AdminDashboard = () => {
  const [isAdmin]=useAdmin()
    return (
        <div className="flex">
        {/* Sidebar */}
        {/* <div className="w-1/4 min-h-screen bg-cyan-500  text-white p-5">
          <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
          <ul>
          {
            isAdmin ? <>
            <li><Link to="/admin/users">Manage Users</Link></li>
            <li><Link to="/admin/categories">Manage Categories</Link></li>
            <li><Link to="/admin/payments">Payment Management</Link></li>
            <li><Link to="/admin/salesReport">Sales Report</Link></li>
            <li><Link to="/">Home</Link></li></>:<><Link to="/">Home</Link></>
          }
          </ul>
        </div> */}
  

<div className="drawer w-0">
  <input id="my-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content w-0">
    {/* Page content here */}
    <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Admin Dashboard</label>
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
      {/* Sidebar content here */}
     {
            isAdmin ? <>
            <li><Link to="/admin/users">Manage Users</Link></li>
            <li><Link to="/admin/categories">Manage Categories</Link></li>
            {/* <li><Link to="/admin/payments">Payment Management</Link></li> */}
            <li><Link to="/admin/salesReport">Sales Report</Link></li>
            <li><Link to="/">Home</Link></li></>:<><Link to="/">Home</Link></>
          }
    </ul>
  </div>
</div>





        {/* Main Content */}
        
        <div className=" mr-0  ml-auto w-3/4 p-5">
          <Outlet />
        </div>
      </div>
    );
};

export default AdminDashboard;