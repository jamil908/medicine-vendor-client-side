import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaUser } from "react-icons/fa";
import { MdProductionQuantityLimits } from "react-icons/md";
import { BsTruck } from "react-icons/bs";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from "recharts";

const AdminChart = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch Admin Stats
  const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  // Fetch Order Stats for Chart
  const { data: chartData = [] } = useQuery({
    queryKey: ["order-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/order-stats");
      return res.data;
    },
  });

  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300"]; // Define colors

  // Custom Shape for Bar Chart
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
    Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  return (
    <div>
      {/* Admin Stats Section */}
      <div className="stats shadow">
        <div className="stat place-items-center">
          <div className="stat-title">Total Revenue</div>
          <div className="stat-value text-secondary">${stats?.revenue}</div>
          <div className="stat-desc">From January 1st to February 1st</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Customers</div>
          <div className="stat-value text-secondary flex gap-2 items-center">
            <FaUser className="w-6" />
            {stats?.users}
          </div>
          <div className="stat-desc text-secondary">↗︎ 40 (2%)</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Products</div>
          <div className="stat-value text-secondary flex gap-2 items-center">
            <MdProductionQuantityLimits />
            {stats?.cartItems}
          </div>
          <div className="stat-desc text-secondary">↗︎ 40 (2%)</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Orders</div>
          <div className="stat-value text-secondary flex gap-2">
            <BsTruck />
            {stats?.orders}
          </div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="flex">
        <div className=" w-1/2">
          <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: "top" }}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </div>
        <div className=" w-1/2"></div>
      </div>
    </div>
  );
};

export default AdminChart;
