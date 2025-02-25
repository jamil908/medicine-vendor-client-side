import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FaUser } from 'react-icons/fa';
import { MdProductionQuantityLimits } from 'react-icons/md';
import { BsTruck } from 'react-icons/bs';

const AdminChart = () => {
    const axiosSecure = useAxiosSecure();
    const {data: stats}= useQuery({
        queryKey:['admin-stats'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/admin-stats');
            return res.data
        }
    })
    console.log(stats)
    return (
        <div>
        <div className="stats shadow">
  <div className="stat place-items-center">
    <div className="stat-title">Total Revenue</div>
    <div className="stat-value text-secondary">${stats?.revenue}</div>
    <div className="stat-desc">From January 1st to February 1st</div>
  </div>

  <div className="stat place-items-center">
    <div className="stat-title">Customer</div>
    <div className="stat-value text-secondary flex gap-2 items-center"><FaUser className='w-6 '></FaUser>{stats?.users}</div>
    <div className="stat-desc text-secondary">↗︎ 40 (2%)</div>
  </div>
  <div className="stat place-items-center">
    <div className="stat-title">Products</div>
    <div className="stat-value text-secondary flex gap-2 items-center"><MdProductionQuantityLimits></MdProductionQuantityLimits>{stats?.cartItems}</div>
    <div className="stat-desc text-secondary">↗︎ 40 (2%)</div>
  </div>

  <div className="stat place-items-center">
    <div className="stat-title">Orders</div>
    <div className="stat-value text-secondary flex gap-2"><BsTruck></BsTruck>{stats?.orders}</div>
    <div className="stat-desc">↘︎ 90 (14%)</div>
  </div>
</div>
            <h1>Welcome to admin Dashboard</h1>
        </div>
    );
};

export default AdminChart;