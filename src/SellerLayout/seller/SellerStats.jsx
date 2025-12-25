import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Providers/AuthProvider";

const SellerStats = () => {
    const { user } = useContext(AuthContext);
    const email = user?.email
  const [stats, setStats] = useState({});

  useEffect(() => {
    if (email) {
      useAxiosSecure.get(`/seller-stats/${email}`).then((res) => setStats(res.data));
    }
  }, [email]);

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <Stat title="Orders" value={stats.totalOrders} />
      <Stat title="Revenue" value={`$${stats.totalRevenue}`} />
      <Stat title="Customers" value={stats.uniqueCustomers} />
      <Stat title="Quantity Sold" value={stats.totalQuantitySold} />
    </div>
  );
};

const Stat = ({ title, value }) => (
  <div style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "6px", textAlign: "center" }}>
    <h4>{title}</h4>
    <p style={{ fontWeight: "bold", fontSize: "18px" }}>{value || 0}</p>
  </div>
);

export default SellerStats;
